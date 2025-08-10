#!/usr/bin/env pwsh

Write-Host "🚀 Starting Rehbar AI Frontend Development Server..." -ForegroundColor Green
Write-Host ""

# Navigate to frontend directory
$frontendPath = "G:\Asli-rehbar-ai\rehbar-ai\frontend"
Set-Location $frontendPath

Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Blue
Write-Host ""

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ package.json not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules found" -ForegroundColor Green
} else {
    Write-Host "❌ node_modules not found, running npm install..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "🔧 Available npm scripts:" -ForegroundColor Cyan
npm run

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host "📝 Running: npm run dev" -ForegroundColor Blue
Write-Host ""

# Try different methods to start the dev server
try {
    # Method 1: npm run dev
    npm run dev
} catch {
    Write-Host "❌ npm run dev failed, trying alternative method..." -ForegroundColor Yellow
    
    try {
        # Method 2: Direct vite command
        & ".\node_modules\.bin\vite.cmd"
    } catch {
        Write-Host "❌ Direct vite command failed, trying npx..." -ForegroundColor Yellow
        
        try {
            # Method 3: npx vite
            npx vite
        } catch {
            Write-Host "❌ All methods failed. Please check the troubleshooting guide." -ForegroundColor Red
            Write-Host ""
            Write-Host "💡 Manual steps to try:" -ForegroundColor Cyan
            Write-Host "1. Open PowerShell as Administrator" -ForegroundColor White
            Write-Host "2. cd G:\Asli-rehbar-ai\rehbar-ai\frontend" -ForegroundColor White
            Write-Host "3. npm cache clean --force" -ForegroundColor White
            Write-Host "4. npm install" -ForegroundColor White
            Write-Host "5. npm run dev" -ForegroundColor White
        }
    }
}

Read-Host "Press Enter to exit"
