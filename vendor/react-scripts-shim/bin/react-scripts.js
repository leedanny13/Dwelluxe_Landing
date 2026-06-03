#!/usr/bin/env node
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const command = process.argv[2];

if (command !== 'build') {
  console.error(`react-scripts shim only supports "build". Received: ${command || '(none)'}`);
  process.exit(1);
}

const buildScript = path.resolve(process.cwd(), 'scripts/build.js');
const result = spawnSync(process.execPath, [buildScript], { stdio: 'inherit' });

process.exit(result.status ?? 1);
