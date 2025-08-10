const express = require('express');
const path = require('path');
const fs = require('fs');
const { createDocument, updateDocument } = require('../config/firebase');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Download configurations - Desktop App Only
const DOWNLOAD_CONFIG = {
  desktop: {
    windows: {
      name: 'Rehbar AI Desktop - Windows',
      version: '1.0.0',
      filename: 'rehbar-ai-setup-windows.exe',
      size: '85 MB',
      description: 'Desktop application for Windows with advanced AI features',
      requirements: ['Windows 10+', '4GB RAM', '500MB disk space'],
      features: [
        'Offline voice processing',
        'System-wide hotkeys',
        'Advanced AI personalities',
        'File analysis',
        'Screen capture AI'
      ]
    },
    mac: {
      name: 'Rehbar AI Desktop - macOS',
      version: '1.0.0',
      filename: 'rehbar-ai-setup-mac.dmg',
      size: '92 MB',
      description: 'Desktop application for macOS with native integration',
      requirements: ['macOS 11+', '4GB RAM', '500MB disk space'],
      features: [
        'Native macOS integration',
        'Spotlight integration',
        'Touch Bar support',
        'Siri shortcuts',
        'Menu bar assistant'
      ]
    },
    linux: {
      name: 'Rehbar AI Desktop - Linux',
      version: '1.0.0',
      filename: 'rehbar-ai-setup-linux.AppImage',
      size: '88 MB',
      description: 'Desktop application for Linux distributions',
      requirements: ['Ubuntu 18.04+', '4GB RAM', '500MB disk space'],
      features: [
        'Cross-distribution support',
        'Command line integration',
        'Desktop notifications',
        'System tray integration',
        'Keyboard shortcuts'
      ]
    }
  }
};

// @route   GET /api/downloads/rehbar-ai-:platform.:ext
// @desc    Serve desktop app files directly
// @access  Private
router.get('/rehbar-ai-:platform.:ext', authMiddleware, async (req, res) => {
  try {
    const { platform, ext } = req.params;
    const user = req.user;
    const userTier = user.subscriptionTier || 'trial';

    // Check download permissions
    const canDownload = userTier !== 'trial' || (user.trialEndDate && new Date() < user.trialEndDate.toDate());

    if (!canDownload) {
      return res.status(403).json({
        success: false,
        error: 'Download access denied',
        message: 'Your trial has expired. Please upgrade to download the desktop app.',
        upgradeRequired: true
      });
    }

    // Validate platform and extension
    const validCombinations = {
      'windows': 'exe',
      'macos': 'dmg',
      'linux': 'AppImage'
    };

    if (!validCombinations[platform] || validCombinations[platform] !== ext) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
        message: 'Invalid platform or file extension'
      });
    }

    // Path to the desktop app files
    const downloadsDir = path.join(__dirname, '../../frontend/public/downloads');
    const filename = `rehbar-ai-${platform}.${ext}`;
    const filePath = path.join(downloadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
        message: 'Desktop app file not available. Please contact support.'
      });
    }

    // Log download attempt
    await createDocument('downloads', {
      userId: req.userId,
      type: 'desktop',
      platform,
      userTier,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      status: 'initiated',
      filename
    });

    // Set appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('end', async () => {
      // Log successful download
      try {
        await createDocument('downloads', {
          userId: req.userId,
          type: 'desktop',
          platform,
          userTier,
          status: 'completed',
          filename
        });
      } catch (error) {
        console.error('Failed to log download completion:', error);
      }
    });

  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({
      success: false,
      error: 'Download failed',
      message: 'Internal server error during download'
    });
  }
});

// @route   GET /api/downloads/info
// @desc    Get download information
// @access  Private
router.get('/info', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const userTier = user.subscriptionTier || 'trial';

    // Check if user can download
    const canDownload = userTier !== 'trial' || (user.trialEndDate && new Date() < user.trialEndDate.toDate());

    if (!canDownload) {
      return res.status(403).json({
        success: false,
        error: 'Download access denied',
        message: 'Your trial has expired. Please upgrade to download applications.',
        upgradeRequired: true
      });
    }

    // Get user's platform preference or detect from user agent
    const userAgent = req.headers['user-agent'] || '';
    let recommendedPlatform = 'windows';
    
    if (userAgent.includes('Mac')) {
      recommendedPlatform = 'mac';
    } else if (userAgent.includes('Linux')) {
      recommendedPlatform = 'linux';
    }

    res.json({
      success: true,
      data: {
        user: {
          tier: userTier,
          canDownload,
          recommendedPlatform
        },
        downloads: {
          desktop: DOWNLOAD_CONFIG.desktop
        }
      }
    });

  } catch (error) {
    console.error('Get download info error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get download information',
      message: 'Internal server error'
    });
  }
});


// @route   GET /api/downloads/desktop/:platform
// @desc    Download desktop application
// @access  Private
router.get('/desktop/:platform', authMiddleware, async (req, res) => {
  try {
    const platform = req.params.platform;
    const user = req.user;
    const userId = req.userId;
    const userTier = user.subscriptionTier || 'trial';

    // Validate platform
    if (!['windows', 'mac', 'linux'].includes(platform)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid platform',
        message: 'Supported platforms: windows, mac, linux'
      });
    }

    // Check download permissions
    const canDownload = userTier !== 'trial' || (user.trialEndDate && new Date() < user.trialEndDate.toDate());

    if (!canDownload) {
      return res.status(403).json({
        success: false,
        error: 'Download access denied',
        message: 'Your trial has expired. Please upgrade to download the desktop app.',
        upgradeRequired: true
      });
    }

    const platformConfig = DOWNLOAD_CONFIG.desktop[platform];

    // Log download attempt
    await createDocument('downloads', {
      userId,
      type: 'desktop',
      platform,
      userTier,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      status: 'initiated'
    });

    // Direct download URL
    const downloadUrl = `${req.protocol}://${req.get('host')}/api/downloads/${platformConfig.filename}`;

    // Platform-specific installation instructions
    const installationInstructions = {
      windows: [
        '1. Download the installer (.exe file)',
        '2. Right-click and select "Run as administrator"',
        '3. Follow the installation wizard',
        '4. Launch Rehbar AI from the Start menu',
        '5. Sign in with your account credentials'
      ],
      mac: [
        '1. Download the disk image (.dmg file)',
        '2. Double-click to mount the disk image',
        '3. Drag Rehbar AI to the Applications folder',
        '4. Launch from Applications or Spotlight',
        '5. Allow permissions when prompted'
      ],
      linux: [
        '1. Download the AppImage file',
        '2. Make it executable: chmod +x rehbar-ai-setup-linux.AppImage',
        '3. Run the AppImage: ./rehbar-ai-setup-linux.AppImage',
        '4. Follow the installation prompts',
        '5. Launch from your application menu'
      ]
    };

    res.json({
      success: true,
      message: `${platformConfig.name} download ready`,
      data: {
        downloadUrl,
        filename: platformConfig.filename,
        size: platformConfig.size,
        version: platformConfig.version,
        platform,
        requirements: platformConfig.requirements,
        features: platformConfig.features,
        instructions: installationInstructions[platform],
        installationGuide: `${req.protocol}://${req.get('host')}/guides/desktop-installation-${platform}`
      }
    });

  } catch (error) {
    console.error('Download desktop error:', error);
    res.status(500).json({
      success: false,
      error: 'Download failed',
      message: 'Internal server error during download'
    });
  }
});

// @route   POST /api/downloads/confirm/:downloadId
// @desc    Confirm successful download
// @access  Private
router.post('/confirm/:downloadId', async (req, res) => {
  try {
    const downloadId = req.params.downloadId;
    const userId = req.userId;

    // Update download status
    await updateDocument('downloads', downloadId, {
      status: 'completed',
      completedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Download confirmed successfully'
    });

  } catch (error) {
    console.error('Confirm download error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to confirm download',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/downloads/history
// @desc    Get user's download history
// @access  Private
router.get('/history', async (req, res) => {
  try {
    const userId = req.userId;

    // Get user's download history
    const { queryDocuments } = require('../config/firebase');
    const downloads = await queryDocuments('downloads', [
      { field: 'userId', operator: '==', value: userId }
    ], { field: 'createdAt', direction: 'desc' }, 50);

    const formattedDownloads = downloads.map(download => ({
      id: download.id,
      type: download.type,
      platform: download.platform,
      status: download.status,
      downloadedAt: download.createdAt,
      completedAt: download.completedAt,
      userTier: download.userTier
    }));

    res.json({
      success: true,
      data: {
        downloads: formattedDownloads,
        total: formattedDownloads.length
      }
    });

  } catch (error) {
    console.error('Get download history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get download history',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/downloads/stats
// @desc    Get download statistics (admin only)
// @access  Private (Admin)
router.get('/stats', async (req, res) => {
  try {
    // This would typically require admin authentication
    // For now, we'll return basic stats

    const { queryDocuments } = require('../config/firebase');
    
    // Get all downloads from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentDownloads = await queryDocuments('downloads', [
      { field: 'createdAt', operator: '>=', value: thirtyDaysAgo }
    ]);

    // Calculate statistics
    const stats = {
      total: recentDownloads.length,
      byType: {
        extension: recentDownloads.filter(d => d.type === 'extension').length,
        desktop: recentDownloads.filter(d => d.type === 'desktop').length
      },
      byPlatform: {
        windows: recentDownloads.filter(d => d.platform === 'windows').length,
        mac: recentDownloads.filter(d => d.platform === 'mac').length,
        linux: recentDownloads.filter(d => d.platform === 'linux').length
      },
      byTier: {
        trial: recentDownloads.filter(d => d.userTier === 'trial').length,
        pro: recentDownloads.filter(d => d.userTier === 'pro').length,
        premium: recentDownloads.filter(d => d.userTier === 'premium').length
      },
      completionRate: recentDownloads.filter(d => d.status === 'completed').length / recentDownloads.length * 100
    };

    res.json({
      success: true,
      data: {
        period: '30 days',
        stats
      }
    });

  } catch (error) {
    console.error('Get download stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get download statistics',
      message: 'Internal server error'
    });
  }
});

module.exports = router;
