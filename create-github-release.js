#!/usr/bin/env node

/**
 * Script to create GitHub release and upload desktop app
 * This handles the large ZIP file that can't be stored in the main repository
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 GitHub Release Creation Script for Rehbar AI');
console.log('================================================');

// Check if ZIP file exists
const zipPath = path.join(__dirname, 'Rehbar-AI-Desktop-v1.0.0.zip');
if (!fs.existsSync(zipPath)) {
    console.error('❌ ZIP file not found:', zipPath);
    console.log('📝 Please run this command first:');
    console.log('   Compress-Archive -Path "cheating-daddy\\dist\\rehbar-ai-win32-x64" -DestinationPath "Rehbar-AI-Desktop-v1.0.0.zip" -Force');
    process.exit(1);
}

const stats = fs.statSync(zipPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log('✅ Found ZIP file:', zipPath);
console.log('📦 File size:', fileSizeMB, 'MB');

console.log('\n📋 Manual Steps to Create GitHub Release:');
console.log('==========================================');

console.log('\n1. Go to your GitHub repository:');
console.log('   https://github.com/hussain0138/Rehbar-AI');

console.log('\n2. Click on "Releases" in the right sidebar');

console.log('\n3. Click "Create a new release"');

console.log('\n4. Fill in the release details:');
console.log('   - Tag version: v1.0.0');
console.log('   - Release title: Rehbar AI Desktop v1.0.0');
console.log('   - Description:');
console.log(`
# Rehbar AI Desktop Application v1.0.0

🎉 **First stable release of Rehbar AI Desktop!**

## 🚀 Features
- Real-time conversation assistance
- Voice recognition and AI responses
- Stealth mode for privacy
- Offline capabilities
- Cross-platform support (Windows ready, macOS/Linux coming soon)

## 📦 Downloads
- **Windows**: Rehbar-AI-Desktop-v1.0.0.zip (${fileSizeMB} MB)
- **macOS**: Coming soon
- **Linux**: Coming soon

## 🛠️ Installation
1. Download the ZIP file for your platform
2. Extract to your desired location
3. Run the executable file
4. Follow the setup wizard

## 🔧 System Requirements
- Windows 10/11 (64-bit)
- 4GB RAM minimum
- 500MB free disk space
- Internet connection for AI features

## 🆘 Support
- Website: https://rehbar-ai.com
- Email: support@rehbar-ai.com
- Documentation: https://github.com/hussain0138/Rehbar-AI/wiki
`);

console.log('\n5. Upload the ZIP file:');
console.log('   - Drag and drop or click "Attach binaries"');
console.log('   - Upload: Rehbar-AI-Desktop-v1.0.0.zip');

console.log('\n6. Click "Publish release"');

console.log('\n✅ After creating the release, your download URLs will be:');
console.log('   Windows: https://github.com/hussain0138/Rehbar-AI/releases/download/v1.0.0/Rehbar-AI-Desktop-v1.0.0.zip');

console.log('\n🔄 The frontend is already configured to use these URLs!');

console.log('\n📝 Alternative: Use GitHub CLI (if installed):');
console.log('   gh release create v1.0.0 Rehbar-AI-Desktop-v1.0.0.zip --title "Rehbar AI Desktop v1.0.0" --notes "First stable release"');

console.log('\n🎯 This approach allows:');
console.log('   ✅ Large files (>100MB) via GitHub Releases');
console.log('   ✅ Clean repository without large binaries');
console.log('   ✅ Vercel deployment without size issues');
console.log('   ✅ Professional release management');
