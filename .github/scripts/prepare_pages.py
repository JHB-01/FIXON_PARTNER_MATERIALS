"""Prepare a bounded Pages artifact; keep offline print masters in the repository."""
import argparse
import hashlib
import html
import os
from pathlib import Path
import re
from urllib.parse import quote

LEGACY = {
    'FIXON_R4_DARK_HERO_client_2026-10-06.zip': '02a1aec8e3950277e0520da890c20bd523a40a4419841046ab4d89f66a667d6d',
    'FIXON_R4_DARK_HERO_github_2026-10-06.zip': 'cacb9f27a7cd8bf706d71e1e1e7dcc6e812ec6ba85575a0405afa102746985f3',
}
PRINT = {f'marketing/r8-ads/{language}-{kind}.svg'
         for language in ('pl', 'en')
         for kind in ('square', 'landscape', 'story', 'rollup', 'backdrop', 'counter')}
MAX_BYTES = 1_000_000_000

def prepare(source, destination, repository, revision):
    source, destination = Path(source).resolve(), Path(destination).resolve()
    if source == destination or destination.is_relative_to(source):
        raise ValueError('Publication folder must be outside the source repository')
    if destination.exists():
        raise ValueError('Publication folder already exists; do not overwrite it')
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9-]*/[A-Za-z0-9_.-]+', repository) or repository.split('/')[-1] in ('.', '..'):
        raise ValueError('Invalid repository name')
    if not re.fullmatch(r'[A-Za-z0-9_.-]+', revision) or revision in ('.', '..'):
        raise ValueError('Invalid revision')
    destination.mkdir(parents=True)
    total, copied = 0, 0
    for file in sorted(source.rglob('*')):
        relative = file.relative_to(source)
        if relative.parts[0] in ('.git', '.github'):
            continue
        if file.is_symlink():
            raise ValueError(f'Symbolic links cannot be published: {relative}')
        if not file.is_file():
            continue
        name = relative.as_posix()
        if name != '.nojekyll' and any(part.startswith('.') for part in relative.parts):
            continue
        if name in LEGACY:
            if hashlib.sha256(file.read_bytes()).hexdigest() != LEGACY[name]:
                raise ValueError(f'Unexpected historical archive bytes: {name}')
            continue
        if name in PRINT:
            continue
        data = file.read_bytes()
        if name == 'marketing/r8-ads/index.html':
            text = data.decode('utf-8')
            for artwork in sorted(PRINT):
                filename = Path(artwork).name
                before = f'href="{filename}"'
                if text.count(before) != 1 or not (source / artwork).is_file():
                    raise ValueError(f'Expected print-master link missing: {artwork}')
                target = f'https://github.com/{repository}/blob/{quote(revision)}/{artwork}'
                text = text.replace(before, f'href="{target}"')
            png = [f'{language}-{kind}.png' for language in ('pl', 'en') for kind in ('square', 'landscape', 'story')]
            for filename in png:
                if not (source / 'marketing/r8-ads' / filename).is_file():
                    raise ValueError(f'Online artwork missing: {filename}')
            png_counts = [text.count(f'href="{filename}"') for filename in png]
            if all(count == 0 for count in png_counts):
                text += '<section id="fx-online-artwork"><h2>Grafiki PNG / PNG Artwork</h2><ul>'
                text += ''.join(f'<li><a href="{html.escape(name)}">{html.escape(name)}</a></li>' for name in png)
                text += '</ul></section>'
            elif any(count != 1 for count in png_counts):
                raise ValueError('Incomplete or duplicated online artwork links')
            data = text.encode('utf-8')
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        total += len(data)
        copied += 1
    if total >= MAX_BYTES:
        raise ValueError(f'Pages artifact too large: {total} bytes; limit {MAX_BYTES}')
    print(f'Pages artifact: {copied} files, {total} bytes, below {MAX_BYTES}; no publication performed by this script.')
    return {'files': copied, 'bytes': total, 'maximumBytes': MAX_BYTES}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source')
    parser.add_argument('destination')
    parser.add_argument('--repository', default=os.environ.get('GITHUB_REPOSITORY'))
    parser.add_argument('--revision', default=os.environ.get('GITHUB_SHA'))
    args = parser.parse_args()
    prepare(args.source, args.destination, args.repository, args.revision)

if __name__ == '__main__':
    main()
