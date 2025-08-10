# 🔧 NPM & Dev Server Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue 1: PowerShell Command Syntax
**Problem**: `&&` doesn't work in PowerShell
**Solution**: Use `;` instead of `&&`

```powershell
# ❌ Wrong (Bash syntax)
cd rehbar-ai/frontend && npm install

# ✅ Correct (PowerShell syntax)
cd rehbar-ai\frontend; npm install
```

### Issue 2: Node.js Path Issues
**Problem**: `spawn C:\Program Files\nodejs ENOENT`
**Solutions**:

1. **Restart PowerShell as Administrator**
2. **Check Node.js installation**:
   ```powershell
   node --version
   npm --version
   ```
3. **Clear npm cache**:
   ```powershell
   npm cache clean --force
   ```

### Issue 3: Dependency Conflicts
**Problem**: Peer dependency warnings
**Solution**: These are usually safe to ignore, but you can fix them:

```powershell
# Update three.js to resolve peer dependency
npm install three@latest

# Or force install
npm install --force
```

## 🚀 Step-by-Step Fix

### Step 1: Navigate to Frontend Directory
```powershell
cd G:\Asli-rehbar-ai\rehbar-ai\frontend
```

### Step 2: Clean Install
```powershell
# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Fresh install
npm install
```

### Step 3: Run Dev Server
```powershell
npm run dev
```

### Step 4: Alternative - Use Yarn
If npm continues to have issues:
```powershell
# Install yarn globally
npm install -g yarn

# Use yarn instead
yarn install
yarn dev
```

## 🔍 Debug Commands

### Check Environment
```powershell
# Check Node.js and npm versions
node --version
npm --version

# Check current directory
pwd

# List files
ls
```

### Check Package.json Scripts
```powershell
# View available scripts
npm run

# Check specific script
Get-Content package.json | Select-String "scripts" -A 10
```

### Manual Vite Start
```powershell
# Run Vite directly
npx vite

# Or with specific port
npx vite --port 3000 --host
```

## 🛠️ Alternative Solutions

### Option 1: Use VS Code Terminal
1. Open VS Code in the project folder
2. Open integrated terminal (Ctrl + `)
3. Run commands in VS Code terminal

### Option 2: Use Command Prompt (cmd)
```cmd
cd G:\Asli-rehbar-ai\rehbar-ai\frontend
npm install
npm run dev
```

### Option 3: Use Git Bash
```bash
cd /g/Asli-rehbar-ai/rehbar-ai/frontend
npm install
npm run dev
```

## 📋 Quick Fix Commands

Run these commands one by one:

```powershell
# 1. Navigate to frontend
cd G:\Asli-rehbar-ai\rehbar-ai\frontend

# 2. Check if package.json exists
Test-Path package.json

# 3. Install dependencies
npm install --verbose

# 4. Start dev server
npm run dev
```

## 🎯 Expected Output

When `npm run dev` works correctly, you should see:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🚨 If Nothing Works

### Last Resort - Manual Setup
1. **Download dependencies manually**
2. **Use different package manager** (yarn, pnpm)
3. **Check Windows PATH environment**
4. **Reinstall Node.js**

### Contact Support
If issues persist, provide:
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Operating system
- Full error message
- PowerShell version (`$PSVersionTable`)

## 💡 Pro Tips

1. **Always use PowerShell as Administrator** for npm operations
2. **Use forward slashes** in paths when possible
3. **Clear npm cache** regularly: `npm cache clean --force`
4. **Update npm**: `npm install -g npm@latest`
5. **Use specific Node.js version** with nvm if available
