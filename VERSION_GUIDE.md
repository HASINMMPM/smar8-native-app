# Smar8Manage - Version Guide & Dependency Management

## 📋 Current Project Versions (Locked)

### Core Dependencies
```json
{
  "expo": "~53.0.20",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "expo-router": "~5.1.4",
  "typescript": "~5.8.3"
}
```

### System Requirements
- **Node.js**: >= 20.19.4 (Recommended: v22.16.0)
- **npm**: >= 10.9.2
- **Expo CLI**: 0.24.20

## 🔧 Version Locking Strategy

### 1. Package.json Version Pinning
All dependencies are pinned to specific versions using `~` (tilde) for patch updates only:
- `~53.0.20` = Accepts 53.0.20 to 53.0.x (patch updates only)
- `^14.1.0` = Accepts 14.1.0 to 14.x.x (minor updates)

### 2. Package-lock.json
- **DO NOT DELETE** this file
- **DO NOT** run `npm update` without team approval
- This file locks exact versions for all dependencies

## 🚨 Common Dependency Issues & Solutions

### Issue 1: Version Mismatch Errors
**Error**: `expo version mismatch` or `react-native version conflict`

**Solution**:
```bash
# 1. Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall exact versions
npm install

# 4. If issues persist, use exact versions
npm install --save-exact expo@53.0.20 react@19.0.0 react-native@0.79.5
```

### Issue 2: Metro Bundler Cache Issues
**Error**: `Metro bundler cache issues` or `Module resolution errors`

**Solution**:
```bash
# 1. Clear Metro cache
npx expo start --clear

# 2. Clear React Native cache
npx react-native start --reset-cache

# 3. Clear Expo cache
npx expo r -c
```

### Issue 3: TypeScript Version Conflicts
**Error**: `TypeScript version mismatch` or `@types/react version conflict`

**Solution**:
```bash
# 1. Check TypeScript version
npx tsc --version

# 2. Install exact TypeScript version
npm install --save-dev typescript@5.8.3

# 3. Update tsconfig.json if needed
```

## 📦 Dependency Management Commands

### Safe Update Commands
```bash
# Check for outdated packages (DO NOT UPDATE AUTOMATICALLY)
npm outdated

# Check security vulnerabilities
npm audit

# Fix security issues (review before applying)
npm audit fix

# Update only patch versions (safer)
npm update
```

### Version Lock Commands
```bash
# Lock all dependencies to exact versions
npm shrinkwrap

# Install exact versions from package-lock.json
npm ci

# Check dependency tree
npm ls
```

## 🔄 Developer Setup Instructions

### For New Developers
1. **Install Required Node.js Version**:
   ```bash
   # Use Node Version Manager (nvm)
   nvm install 22.16.0
   nvm use 22.16.0
   ```

2. **Install Expo CLI**:
   ```bash
   npm install -g @expo/cli@0.24.20
   ```

3. **Clone and Setup Project**:
   ```bash
   git clone <repository-url>
   cd Smar8Manage
   npm install
   ```

4. **Verify Versions**:
   ```bash
   node --version  # Should be v22.16.0
   npm --version   # Should be >= 10.9.2
   npx expo --version  # Should be 0.24.20
   ```

### For Existing Developers (Version Sync)
1. **Check Current Versions**:
   ```bash
   node --version
   npm --version
   npx expo --version
   ```

2. **Update if Different**:
   ```bash
   # Update Node.js if needed
   nvm install 22.16.0
   nvm use 22.16.0
   
   # Update Expo CLI
   npm install -g @expo/cli@0.24.20
   ```

3. **Reset Project Dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🛠️ Troubleshooting Checklist

### Before Reporting Issues
- [ ] Node.js version is 22.16.0
- [ ] npm version is >= 10.9.2
- [ ] Expo CLI version is 0.24.20
- [ ] Cleared all caches (Metro, npm, Expo)
- [ ] Deleted node_modules and reinstalled
- [ ] Checked package-lock.json exists and is not corrupted

### Common Error Solutions

#### "Module not found" Errors
```bash
# Solution 1: Clear Metro cache
npx expo start --clear

# Solution 2: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Solution 3: Check import paths
# Ensure imports match the exact file structure
```

#### "Version mismatch" Errors
```bash
# Solution 1: Force exact versions
npm install --save-exact expo@53.0.20

# Solution 2: Update package.json to match
# Manually edit package.json to use exact versions

# Solution 3: Use npm ci for exact install
npm ci
```

#### "Build failed" Errors
```bash
# Solution 1: Clear all caches
npx expo r -c
npm cache clean --force

# Solution 2: Reset project
npm run reset-project

# Solution 3: Check TypeScript errors
npx tsc --noEmit
```

## 📝 Version Update Protocol

### When Updating Versions
1. **Create a new branch** for version updates
2. **Update one dependency at a time**
3. **Test thoroughly** after each update
4. **Update this document** with new versions
5. **Get team approval** before merging
6. **Notify all developers** of version changes

### Version Update Commands
```bash
# Update specific package
npm install expo@latest

# Update all packages (DANGEROUS - review first)
npm update

# Check what would be updated
npm outdated
```

## 🔍 Version Verification Script

Create a script to verify all versions match:

```bash
#!/bin/bash
echo "=== Version Check ==="
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Expo CLI: $(npx expo --version)"
echo "Expo SDK: $(npm list expo)"
echo "React: $(npm list react)"
echo "React Native: $(npm list react-native)"
echo "TypeScript: $(npx tsc --version)"
```

## 📞 Support Contacts

- **Project Lead**: [Your Name]
- **Technical Lead**: [Tech Lead Name]
- **Documentation**: This file should be updated with any version changes

## ⚠️ Important Notes

1. **NEVER** delete `package-lock.json` without team approval
2. **ALWAYS** test after dependency changes
3. **COMMUNICATE** version changes to the entire team
4. **DOCUMENT** any workarounds or special configurations
5. **BACKUP** working configurations before major updates

---

**Last Updated**: [Current Date]
**Project**: Smar8Manage
**Expo SDK**: 53.0.20
**React**: 19.0.0
**React Native**: 0.79.5
