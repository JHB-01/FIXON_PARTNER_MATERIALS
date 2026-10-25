[CmdletBinding(SupportsShouldProcess=$true)]
param([Parameter(Mandatory=$true)][string]$Repozytorium, [switch]$Usun)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $Repozytorium).Path
if (-not (Test-Path -LiteralPath (Join-Path $root '.git'))) { throw 'Podaj glowny folder repozytorium GitHub Desktop.' }
$prefix = $root.TrimEnd('\','/') + [IO.Path]::DirectorySeparatorChar
$names = @(
    'd9e5baeba9d51c14f89db89de94ff0812b58ba8bf2bb01f02c5fe5572c5b2e12',
    'eb742a07af60585cacb43601e1f4c36adee2add3070bbdfb7bc7f9a974748ea4'
)
foreach ($digest in $names) {
    $relative = "assets/fixon-media/$digest.webp"
    $target = [IO.Path]::GetFullPath((Join-Path $root $relative))
    if (-not $target.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) { throw 'Sciezka poza repozytorium.' }
    if (-not (Test-Path -LiteralPath $target -PathType Leaf)) { continue }
    if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash.ToLowerInvariant() -ne $digest) {
        Write-Warning "Inna zawartosc, pozostawiono: $relative"; continue
    }
    if ($Usun -and $PSCmdlet.ShouldProcess($target, 'Usun nieuzywany plik starego logo o potwierdzonej sumie SHA256')) {
        Remove-Item -LiteralPath $target
    } else { Write-Output "Potwierdzone stare logo, bez usuwania: $relative" }
}
