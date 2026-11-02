# ARGHYA_MODIFICATIONS - Unified Services Runner (PowerShell)
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Starting ARGHYA_MODIFICATIONS Unified Stack" -ForegroundColor Green
Write-Host " 1) Docker Redis Cache (Port 6379)" -ForegroundColor Magenta
Write-Host " 2) Backend API (Port 3000)      -> http://localhost:3000/health" -ForegroundColor Cyan
Write-Host " 3) Frontend Web App (Port 3001) -> http://localhost:3001" -ForegroundColor Blue
Write-Host " 4) Python Analytics Engine      -> Monitoring active" -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

node start-all.js

