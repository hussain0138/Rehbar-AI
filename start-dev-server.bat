@echo off
echo Starting Rehbar AI Frontend Development Server...
echo.

cd /d "G:\Asli-rehbar-ai\rehbar-ai\frontend"

echo Current directory: %CD%
echo.

echo Checking if package.json exists...
if exist package.json (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found
    pause
    exit /b 1
)

echo.
echo Checking if node_modules exists...
if exist node_modules (
    echo ✅ node_modules found
) else (
    echo ❌ node_modules not found, running npm install...
    npm install
)

echo.
echo Starting development server...
echo.
echo 🚀 Running: npm run dev
echo.

npm run dev

pause
