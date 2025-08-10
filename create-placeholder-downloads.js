#!/usr/bin/env node

/**
 * Create placeholder download files for development/testing
 * This script creates dummy files that can be used for testing the download system
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'rehbar-ai', 'frontend', 'public', 'downloads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created directory: ${OUTPUT_DIR}`);
}

// Platform configurations
const platforms = [
    {
        name: 'Windows',
        filename: 'rehbar-ai-windows.exe',
        size: 85 * 1024 * 1024, // 85 MB
        content: 'This is a placeholder Windows executable for Rehbar AI Desktop App.\n\nIn production, this would be the actual Windows installer.\n\nFeatures:\n- Offline voice processing\n- System-wide hotkeys\n- Advanced AI personalities\n- File analysis\n- Screen capture AI'
    },
    {
        name: 'macOS',
        filename: 'rehbar-ai-macos.dmg',
        size: 92 * 1024 * 1024, // 92 MB
        content: 'This is a placeholder macOS disk image for Rehbar AI Desktop App.\n\nIn production, this would be the actual macOS installer.\n\nFeatures:\n- Native macOS integration\n- Spotlight integration\n- Touch Bar support\n- Siri shortcuts\n- Menu bar assistant'
    },
    {
        name: 'Linux',
        filename: 'rehbar-ai-linux.AppImage',
        size: 88 * 1024 * 1024, // 88 MB
        content: 'This is a placeholder Linux AppImage for Rehbar AI Desktop App.\n\nIn production, this would be the actual Linux AppImage.\n\nFeatures:\n- Cross-distribution support\n- Command line integration\n- Desktop notifications\n- System tray integration\n- Keyboard shortcuts'
    }
];

console.log('🚀 Creating placeholder download files...');

// Create placeholder files
platforms.forEach(platform => {
    const filePath = path.join(OUTPUT_DIR, platform.filename);
    
    // Create a buffer with the specified size
    const buffer = Buffer.alloc(Math.min(platform.size, 1024 * 1024)); // Limit to 1MB for development
    
    // Fill the buffer with the content repeated
    const contentBuffer = Buffer.from(platform.content, 'utf8');
    for (let i = 0; i < buffer.length; i += contentBuffer.length) {
        const remainingBytes = Math.min(contentBuffer.length, buffer.length - i);
        contentBuffer.copy(buffer, i, 0, remainingBytes);
    }
    
    // Write the file
    fs.writeFileSync(filePath, buffer);
    
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`✅ ${platform.name}: ${platform.filename} (${sizeInMB} MB)`);
});

// Create checksums file
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
platforms.forEach(platform => {
    const filePath = path.join(OUTPUT_DIR, platform.filename);
    checksums[platform.filename] = generateChecksum(filePath);
});

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'checksums.json'),
    JSON.stringify(checksums, null, 2)
);

// Create a README file
const readmeContent = `# Rehbar AI Desktop App Downloads

This directory contains the desktop application files for different platforms.

## Available Downloads

${platforms.map(p => `- **${p.name}**: \`${p.filename}\``).join('\n')}

## Checksums

SHA256 checksums are available in \`checksums.json\` for file integrity verification.

## Installation Instructions

### Windows
1. Download \`rehbar-ai-windows.exe\`
2. Run the installer as administrator
3. Follow the installation wizard
4. Launch from Start Menu

### macOS
1. Download \`rehbar-ai-macos.dmg\`
2. Mount the disk image
3. Drag app to Applications folder
4. Launch from Applications

### Linux
1. Download \`rehbar-ai-linux.AppImage\`
2. Make executable: \`chmod +x rehbar-ai-linux.AppImage\`
3. Run: \`./rehbar-ai-linux.AppImage\`

## Development Notes

These are placeholder files for development/testing. In production, these would be replaced with actual compiled applications from the build process.
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), readmeContent);

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

console.log('\n🎉 Placeholder files created successfully!');
console.log('\n💡 To create actual builds, run: node build-desktop-app.js');
