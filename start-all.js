#!/usr/bin/env node

/**
 * Arghya Modifications - Unified Single-Command Service Orchestrator
 *
 * Simultaneously runs:
 *  1) Docker Redis Cache (Port 6379)
 *  2) Backend API (Port 3000)
 *  3) Frontend Web App (Port 3001)
 *  4) Python Analytics & Inventory Engine
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const process = require('process');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';
const pythonCmd = isWin ? 'python' : 'python3';

// ANSI Colors for output distinction
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  backend: '\x1b[36m', // Cyan
  frontend: '\x1b[34m', // Blue
  python: '\x1b[33m',   // Yellow
  redis: '\x1b[35m',    // Magenta
  system: '\x1b[32m',   // Green
  error: '\x1b[31m',    // Red
};

const processes = [];
let redisContainerStarted = false;

function log(prefix, color, message) {
  const lines = message.toString().split('\n');
  lines.forEach((line) => {
    if (line.trim().length > 0) {
      console.log(`${color}${colors.bold}[${prefix}]${colors.reset} ${line}`);
    }
  });
}

// 1. Attempt to start Redis via Docker if Docker is active
function checkAndStartRedis() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    log('REDIS', colors.redis, 'Docker detected. Starting Redis container on port 6379...');
    try {
      execSync('docker run -d --rm --name arghya-redis -p 6379:6379 redis:7-alpine', { stdio: 'ignore' });
      redisContainerStarted = true;
      log('REDIS', colors.redis, 'Redis container active on port 6379.');
    } catch {
      log('REDIS', colors.redis, 'Redis container already running or port 6379 available.');
    }
  } catch {
    log('REDIS', colors.redis, 'Docker not running locally. Backend will proceed using local database/cache fallback.');
  }
}

// 2. Start a child service
function startService(name, color, cmd, args, cwd) {
  log(name, color, `Starting in ${cwd}...`);
  const fullCmd = [cmd, ...args].join(' ');
  const child = spawn(fullCmd, {
    cwd: path.resolve(__dirname, cwd),
    shell: true,
    env: { ...process.env, FORCE_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.on('data', (data) => log(name, color, data));
  child.stderr.on('data', (data) => log(name, color, data));

  child.on('close', (code) => {
    log(name, color, `Service exited with code ${code}`);
  });

  processes.push({ name, process: child });
}

// Clean shutdown handler
function shutdown() {
  console.log(`\n${colors.system}${colors.bold}[SYSTEM] Shutting down all Arghya services...${colors.reset}`);
  
  processes.forEach(({ name, process: child }) => {
    if (child && child.pid) {
      try {
        if (isWin) {
          execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: 'ignore' });
        } else {
          process.kill(-child.pid, 'SIGTERM');
        }
      } catch {
        // Process might already be dead
      }
    }
  });

  if (redisContainerStarted) {
    try {
      execSync('docker stop arghya-redis', { stdio: 'ignore' });
    } catch {
      // Ignore cleanup error
    }
  }

  console.log(`${colors.system}[SYSTEM] All services stopped cleanly. Goodbye!${colors.reset}`);
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log(`${colors.system}${colors.bold}================================================================${colors.reset}`);
console.log(`${colors.system}${colors.bold}🚀 Starting ARGHYA_MODIFICATIONS Unified Stack${colors.reset}`);
console.log(`${colors.system}  1) Redis Cache (Port 6379)`);
console.log(`${colors.system}  2) Backend API (Port 3000)      -> http://localhost:3000/health`);
console.log(`${colors.system}  3) Frontend App (Port 3001)     -> http://localhost:3001`);
console.log(`${colors.system}  4) Python Analytics Engine      -> Monitoring active`);
console.log(`${colors.system}${colors.bold}================================================================${colors.reset}\n`);

// Boot services
checkAndStartRedis();
startService('BACKEND:3000', colors.backend, npmCmd, ['run', 'dev'], 'backend');
startService('FRONTEND:3001', colors.frontend, npmCmd, ['run', 'dev'], 'frontend');
startService('PYTHON', colors.python, pythonCmd, ['runner.py'], 'python');
