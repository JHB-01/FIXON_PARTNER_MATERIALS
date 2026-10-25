param([Parameter(Mandatory=$true)][string]$Repozytorium)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $Repozytorium).Path
if (-not (Test-Path -LiteralPath (Join-Path $root '.git'))) { throw 'Podaj glowny folder repozytorium GitHub Desktop.' }
$prefix = $root.TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'MANIFEST_R8_ZBIORCZY.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$conflicts = @()
$missing = 0
$ready = 0
foreach ($entry in $manifest.files) {
    $target = [IO.Path]::GetFullPath((Join-Path $root $entry.path))
    if (-not $target.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { throw 'Niebezpieczna sciezka w manifescie.' }
    if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { $missing++; continue }
    $actual = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($actual -eq $entry.sha256 -or ($entry.baselineSha256 -and $actual -eq $entry.baselineSha256)) { $ready++; continue }
    $conflicts += $entry.path
}
Write-Output "Zgodne pliki: $ready. Pliki do dodania: $missing. Konflikty: $($conflicts.Count)."
if ($conflicts.Count) {
    $conflicts | ForEach-Object { Write-Output "SPRAWDZ WLASNE ZMIANY: $_" }
    throw 'Przed kopiowaniem polacz lub zabezpiecz wlasne zmiany. Niczego nie zmieniono.'
}
Write-Output 'Kontrola zakonczona. Skrypt niczego nie skopiowal ani nie usunal.'
