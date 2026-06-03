#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const buildDir = path.join(root, 'build');
const publicFiles = ['index.html', 'styles.css', 'main.js'];

const copyFile = (source, destination) => {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
};

const copyDirectory = (source, destination) => {
  if (!fs.existsSync(source)) {
    return;
  }

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else if (entry.isFile()) {
      copyFile(sourcePath, destinationPath);
    }
  }
};

fs.rmSync(buildDir, { recursive: true, force: true });
fs.mkdirSync(buildDir, { recursive: true });

for (const file of publicFiles) {
  const source = path.join(root, file);

  if (!fs.existsSync(source)) {
    throw new Error(`Required file missing: ${file}`);
  }

  copyFile(source, path.join(buildDir, file));
}

copyDirectory(path.join(root, 'assets'), path.join(buildDir, 'assets'));

console.log('Created production build in build/.');
