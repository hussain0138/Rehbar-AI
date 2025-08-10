#!/usr/bin/env node

/**
 * Copy actual desktop app files from cheating-daddy/dist to frontend downloads
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, 'cheating-daddy', 'dist', 'rehbar-ai-win32-x64');
const OUTPUT_DIR = path.join(__dirname, 'rehbar-ai', 'frontend', 'public', 'downloads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created directory: ${OUTPUT_DIR}`);
}

console.log('🚀 Copying actual desktop app files...');
console.log(`📁 Source: ${SOURCE_DIR}`);
console.log(`📁 Output: ${OUTPUT_DIR}`);

// Check if source exe exists
const sourceExe = path.join(SOURCE_DIR, 'rehbar-ai.exe');
if (!fs.existsSync(sourceExe)) {
    console.error('❌ Source exe not found:', sourceExe);
    console.log('💡 Please build the desktop app first by running: cd cheating-daddy && npm run make');
    process.exit(1);
}

// Copy the Windows executable
const targetExe = path.join(OUTPUT_DIR, 'rehbar-ai-windows.exe');
try {
    fs.copyFileSync(sourceExe, targetExe);
    const stats = fs.statSync(targetExe);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ Windows: rehbar-ai-windows.exe (${sizeInMB} MB)`);
} catch (error) {
    console.error('❌ Failed to copy Windows exe:', error.message);
    process.exit(1);
}

// Create placeholder files for other platforms (since we only have Windows build)
const placeholders = [
    {
        name: 'macOS',
        filename: 'rehbar-ai-macos.dmg',
        content: 'macOS version coming soon. This is a placeholder file.\n\nTo build for macOS, run the desktop app build process on a Mac system.'
    },
    {
        name: 'Linux',
        filename: 'rehbar-ai-linux.AppImage',
        content: 'Linux version coming soon. This is a placeholder file.\n\nTo build for Linux, run the desktop app build process on a Linux system.'
    }
];

placeholders.forEach(platform => {
    const filePath = path.join(OUTPUT_DIR, platform.filename);
    const buffer = Buffer.from(platform.content, 'utf8');
    fs.writeFileSync(filePath, buffer);
    
    const stats = fs.statSync(filePath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📝 ${platform.name}: ${platform.filename} (${sizeInKB} KB - placeholder)`);
});

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

const checksums = {};
const allFiles = ['rehbar-ai-windows.exe', 'rehbar-ai-macos.dmg', 'rehbar-ai-linux.AppImage'];

allFiles.forEach(filename => {
    const filePath = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(filePath)) {
        checksums[filename] = generateChecksum(filePath);
    }
});

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'checksums.json'),
    JSON.stringify(checksums, null, 2)
);

// Update the download info
const downloadInfo = {
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    platforms: {
        windows: {
            filename: 'rehbar-ai-windows.exe',
            size: fs.statSync(targetExe).size,
            checksum: checksums['rehbar-ai-windows.exe'],
            status: 'available'
        },
        macos: {
            filename: 'rehbar-ai-macos.dmg',
            size: fs.statSync(path.join(OUTPUT_DIR, 'rehbar-ai-macos.dmg')).size,
            checksum: checksums['rehbar-ai-macos.dmg'],
            status: 'placeholder'
        },
        linux: {
            filename: 'rehbar-ai-linux.AppImage',
            size: fs.statSync(path.join(OUTPUT_DIR, 'rehbar-ai-linux.AppImage')).size,
            checksum: checksums['rehbar-ai-linux.AppImage'],
            status: 'placeholder'
        }
    }
};

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'download-info.json'),
    JSON.stringify(downloadInfo, null, 2)
);

console.log('\n📋 Summary:');
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
console.log('📄 Files created:');

const outputFiles = fs.readdirSync(OUTPUT_DIR);
outputFiles.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   - ${file} (${sizeInMB} MB)`);
});

console.log('\n🎉 Desktop app files copied successfully!');
console.log('\n💡 The Windows executable is now ready for download through the portal system.');
