#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Smar8Manage - Version Check Script');
console.log('=====================================\n');

// Expected versions
const EXPECTED_VERSIONS = {
  node: '22.16.0',
  npm: '10.9.2',
  expoCLI: '0.24.20',
  expoSDK: '53.0.20',
  react: '19.0.0',
  reactNative: '0.79.5',
  typescript: '5.8.3'
};

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getVersion(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    return 'NOT FOUND';
  }
}

function compareVersions(actual, expected, name) {
  if (actual === expected) {
    log(`✅ ${name}: ${actual}`, 'green');
    return true;
  } else if (actual === 'NOT FOUND') {
    log(`❌ ${name}: NOT INSTALLED`, 'red');
    return false;
  } else {
    log(`⚠️  ${name}: ${actual} (Expected: ${expected})`, 'yellow');
    return false;
  }
}

// Check system versions
log('\n📋 System Versions:', 'blue');
const nodeVersion = getVersion('node --version');
const npmVersion = getVersion('npm --version');
const expoCLIVersion = getVersion('npx expo --version');

let allSystemVersionsMatch = true;
allSystemVersionsMatch &= compareVersions(nodeVersion, `v${EXPECTED_VERSIONS.node}`, 'Node.js');
allSystemVersionsMatch &= compareVersions(npmVersion, EXPECTED_VERSIONS.npm, 'npm');
allSystemVersionsMatch &= compareVersions(expoCLIVersion, EXPECTED_VERSIONS.expoCLI, 'Expo CLI');

// Check project dependencies
log('\n📦 Project Dependencies:', 'blue');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const expoSDKVersion = packageJson.dependencies?.expo || 'NOT FOUND';
  const reactVersion = packageJson.dependencies?.react || 'NOT FOUND';
  const reactNativeVersion = packageJson.dependencies?.['react-native'] || 'NOT FOUND';
  const typescriptVersion = packageJson.devDependencies?.typescript || 'NOT FOUND';

  let allProjectVersionsMatch = true;
  allProjectVersionsMatch &= compareVersions(expoSDKVersion, EXPECTED_VERSIONS.expoSDK, 'Expo SDK');
  allProjectVersionsMatch &= compareVersions(reactVersion, EXPECTED_VERSIONS.react, 'React');
  allProjectVersionsMatch &= compareVersions(reactNativeVersion, EXPECTED_VERSIONS.reactNative, 'React Native');
  allProjectVersionsMatch &= compareVersions(typescriptVersion, EXPECTED_VERSIONS.typescript, 'TypeScript');

  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    log('✅ node_modules: Found', 'green');
  } else {
    log('❌ node_modules: Not found - Run "npm install"', 'red');
    allProjectVersionsMatch = false;
  }

  // Check if package-lock.json exists
  const packageLockPath = path.join(__dirname, '..', 'package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    log('✅ package-lock.json: Found', 'green');
  } else {
    log('❌ package-lock.json: Not found - Run "npm install"', 'red');
    allProjectVersionsMatch = false;
  }

  // Summary
  log('\n📊 Summary:', 'blue');
  if (allSystemVersionsMatch && allProjectVersionsMatch) {
    log('🎉 All versions match! Your environment is ready.', 'green');
  } else {
    log('⚠️  Some versions don\'t match. Please check the issues above.', 'yellow');
    log('\n🔧 Quick Fix Commands:', 'blue');
    log('1. Update Node.js: nvm install 22.16.0 && nvm use 22.16.0', 'yellow');
    log('2. Update Expo CLI: npm install -g @expo/cli@0.24.20', 'yellow');
    log('3. Reinstall dependencies: rm -rf node_modules package-lock.json && npm install', 'yellow');
  }
} else {
  log('❌ package.json not found. Make sure you\'re in the project root directory.', 'red');
}

console.log('\n📖 For more information, see VERSION_GUIDE.md');
