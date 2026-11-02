@echo off
title ARGHYA_MODIFICATIONS - Unified Services Runner
echo ================================================================
echo Starting ARGHYA_MODIFICATIONS Unified Stack
echo 1) Docker Redis Cache (Port 6379)
echo 2) Backend API (Port 3000)
echo 3) Frontend Web App (Port 3001)
echo 4) Python Analytics Engine
echo ================================================================
echo.

node start-all.js
pause

