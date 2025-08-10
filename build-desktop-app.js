#!/usr/bin/env node

/**
 * Build script for Rehbar AI Desktop App
 * Generates executables for Windows, macOS, and Linux
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DESKTOP_APP_DIR = path.join(__dirname, 'cheating-daddy');
const OUTPUT_DIR = path.join(__dirname, 'rehbar-ai', 'frontend', 'public', 'downloads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🚀 Building Rehbar AI Desktop App...');
console.log(`📁 Desktop app source: ${DESKTOP_APP_DIR}`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);

// Change to desktop app directory
process.chdir(DESKTOP_APP_DIR);

// Install dependencies if needed
console.log('📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
}

// Build for different platforms
const platforms = [
    {
        name: 'Windows',
        command: 'npm run make -- --platform=win32',
        outputPattern: 'out/make/squirrel.windows/x64/*.exe',
        targetName: 'rehbar-ai-windows.exe'
    },
    {
        name: 'macOS',
        command: 'npm run make -- --platform=darwin',
        outputPattern: 'out/make/*.dmg',
        targetName: 'rehbar-ai-macos.dmg'
    },
    {
        name: 'Linux',
        command: 'npm run make -- --platform=linux',
        outputPattern: 'out/make/appimage/x64/*.AppImage',
        targetName: 'rehbar-ai-linux.AppImage'
    }
];

// Function to copy built files
function copyBuiltFiles(platform) {
    const glob = require('glob');
    const outputPattern = path.join(DESKTOP_APP_DIR, platform.outputPattern);
    
    try {
        const files = glob.sync(outputPattern);
        if (files.length === 0) {
            console.log(`⚠️  No files found for ${platform.name} at ${outputPattern}`);
            return false;
        }
        
        const sourceFile = files[0]; // Take the first match
        const targetFile = path.join(OUTPUT_DIR, platform.targetName);
        
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`✅ ${platform.name}: ${path.basename(sourceFile)} → ${platform.targetName}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to copy ${platform.name} build:`, error.message);
        return false;
    }
}

// Build for current platform only (for faster development)
const currentPlatform = process.platform;
let targetPlatforms = platforms;

if (process.argv.includes('--current-only')) {
    if (currentPlatform === 'win32') {
        targetPlatforms = [platforms[0]]; // Windows
    } else if (currentPlatform === 'darwin') {
        targetPlatforms = [platforms[1]]; // macOS
    } else {
        targetPlatforms = [platforms[2]]; // Linux
    }
    console.log(`🎯 Building for current platform only: ${targetPlatforms[0].name}`);
}

// Build each platform
let successCount = 0;
for (const platform of targetPlatforms) {
    console.log(`\n🔨 Building for ${platform.name}...`);
    
    try {
        // Run the build command
        execSync(platform.command, { stdio: 'inherit' });
        
        // Copy the built file to the output directory
        if (copyBuiltFiles(platform)) {
            successCount++;
        }
    } catch (error) {
        console.error(`❌ Failed to build for ${platform.name}:`, error.message);
        
        // For development, create a placeholder file
        const placeholderPath = path.join(OUTPUT_DIR, platform.targetName);
        fs.writeFileSync(placeholderPath, `Placeholder for ${platform.name} build`);
        console.log(`📝 Created placeholder: ${platform.targetName}`);
    }
}

// Generate checksums
console.log('\n🔐 Generating checksums...');
const crypto = require('crypto');

function generateChecksum(filePath) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        return hashSum.digest('hex');
    } catch (error) {
        return 'unavailable';
    }
}

// Create checksums file
const checksums = {};
for (const platform of platforms) {
    const filePath = path.join(OUTPUT_DIR, platform.targetName);
    if (fs.existsSync(filePath)) {
        checksums[platform.targetName] = generateChecksum(filePath);
    }
}

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'checksums.json'),
    JSON.stringify(checksums, null, 2)
);

console.log('\n📋 Build Summary:');
console.log(`✅ Successfully built: ${successCount}/${targetPlatforms.length} platforms`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
console.log('📄 Files created:');

// List all files in output directory
const outputFiles = fs.readdirSync(OUTPUT_DIR);
outputFiles.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   - ${file} (${sizeInMB} MB)`);
});

console.log('\n🎉 Build process completed!');
