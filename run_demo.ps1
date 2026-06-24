$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
if (-not $projectRoot) {
  $projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
}

$pythonCandidates = @(
  "python",
  "py",
  "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
)

$python = $null
foreach ($candidate in $pythonCandidates) {
  try {
    $resolved = Get-Command $candidate -ErrorAction Stop
    $python = $resolved.Source
    break
  } catch {
  }
}

if (-not $python) {
  throw "No Python executable found. Install Python 3.11+ or run from the Codex bundled runtime."
}

Push-Location $projectRoot
try {
  $env:PYTHONPATH = Join-Path $projectRoot "src"
  & $python -m mining_orchestrator.cli `
    --config (Join-Path $projectRoot "config.demo.json") `
    --ticks 10 `
    --delay 0.5 `
    --show-agents `
    --live-actions `
    --jsonl (Join-Path $projectRoot "logs\decisions.jsonl")
} finally {
  Pop-Location
}
