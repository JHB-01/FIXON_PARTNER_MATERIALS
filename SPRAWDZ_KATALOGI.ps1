param([Parameter(Mandatory=$true)][string]$Repo)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $Repo).Path
$expected = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'OCZEKIWANE_KATALOGI_R9.json') -Raw | ConvertFrom-Json
$bad = @()
foreach ($row in $expected) {
    $file = Join-Path $root $row.path
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { $bad += "BRAK: $($row.path)"; continue }
    $algorithm = [System.Security.Cryptography.SHA256]::Create()
    $stream = [System.IO.File]::OpenRead($file)
    try { $actual = ([System.BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
    finally { $stream.Dispose(); $algorithm.Dispose() }
    if ($actual -ne $row.sha256) { $bad += "INNA WERSJA: $($row.path)" }
}
if ($bad.Count -gt 0) {
    $bad | ForEach-Object { Write-Output $_ }
    Write-Output 'STOP: repo nie zawiera wszystkich katalogow ze zbiorczej R8 + R9. Naloz ponownie pelna R8 z 24.10, potem ten mini-update. Nie publikuj mieszanej wersji.'
    exit 2
}
Write-Output "PASS: wszystkie $($expected.Count) samodzielne katalogi R8/R9 maja poprawne sumy. Nie zmieniono zadnych plikow."
