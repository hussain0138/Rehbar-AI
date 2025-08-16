class TrialManager {
    constructor() {
        this.trialDays = 5;
        this.storageKey = 'rehbar_trial_data';
        this.paymentKey = 'rehbar_payment_status';
        this.deviceIdKey = 'rehbar_device_id';
        this.init();
    }

    init() {
        // Generate or retrieve device ID
        this.deviceId = this.getDeviceId();
        
        // Load trial data
        this.trialData = this.loadTrialData();
        
        // Check if trial has expired
        this.checkTrialStatus();
    }

    getDeviceId() {
        let deviceId = localStorage.getItem(this.deviceIdKey);
        if (!deviceId) {
            // Generate a unique device ID based on hardware and user info
            deviceId = this.generateDeviceId();
            localStorage.setItem(this.deviceIdKey, deviceId);
        }
        return deviceId;
    }

    generateDeviceId() {
        // Create a unique device fingerprint
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Rehbar AI Device ID', 2, 2);
        
        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            canvas.toDataURL()
        ].join('|');
        
        // Create hash from fingerprint
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return 'rehbar_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36);
    }

    loadTrialData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load trial data:', e);
        }

        // Initialize new trial
        const trialData = {
            deviceId: this.deviceId,
            startDate: new Date().toISOString(),
            endDate: this.calculateTrialEnd(),
            isActive: true,
            paymentStatus: 'trial',
            paymentMethod: null,
            paymentDate: null,
            plan: 'trial'
        };

        this.saveTrialData(trialData);
        return trialData;
    }

    calculateTrialEnd() {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + this.trialDays);
        return endDate.toISOString();
    }

    saveTrialData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save trial data:', e);
        }
    }

    checkTrialStatus() {
        const now = new Date();
        const trialEnd = new Date(this.trialData.endDate);
        
        if (now > trialEnd && this.trialData.paymentStatus === 'trial') {
            this.trialData.isActive = false;
            this.saveTrialData(this.trialData);
        }
    }

    isTrialActive() {
        this.checkTrialStatus();
        return this.trialData.isActive;
    }

    getTrialDaysRemaining() {
        if (!this.isTrialActive()) return 0;
        
        const now = new Date();
        const trialEnd = new Date(this.trialData.endDate);
        const diffTime = trialEnd - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(0, diffDays);
    }

    getTrialProgress() {
        const totalDays = this.trialDays;
        const remainingDays = this.getTrialDaysRemaining();
        const usedDays = totalDays - remainingDays;
        
        return {
            total: totalDays,
            used: usedDays,
            remaining: remainingDays,
            percentage: Math.round((usedDays / totalDays) * 100)
        };
    }

    verifyPayment(paymentData) {
        // This would integrate with your manual verification system
        // For now, we'll simulate verification
        return new Promise((resolve) => {
            // Simulate API call to your backend
            setTimeout(() => {
                // In real implementation, this would call your verification endpoint
                const isVerified = this.manualVerification(paymentData);
                
                if (isVerified) {
                    this.trialData.paymentStatus = 'verified';
                    this.trialData.paymentMethod = paymentData.method;
                    this.trialData.paymentDate = new Date().toISOString();
                    this.trialData.plan = paymentData.plan || 'basic';
                    this.trialData.isActive = true;
                    this.saveTrialData(this.trialData);
                    
                    resolve({
                        success: true,
                        message: 'Payment verified successfully!',
                        plan: this.trialData.plan
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Payment verification failed. Please try again.'
                    });
                }
            }, 1000);
        });
    }

    manualVerification(paymentData) {
        // This is where you'd implement your manual verification logic
        // For now, we'll accept any payment with a valid reference number
        return paymentData.reference && paymentData.reference.length > 5;
    }

    getPaymentInfo() {
        return {
            trialDays: this.trialDays,
            trialProgress: this.getTrialProgress(),
            paymentStatus: this.trialData.paymentStatus,
            plan: this.trialData.plan,
            isActive: this.isTrialActive()
        };
    }

    resetTrial() {
        // This method should be used carefully - only for legitimate resets
        const trialData = {
            deviceId: this.deviceId,
            startDate: new Date().toISOString(),
            endDate: this.calculateTrialEnd(),
            isActive: true,
            paymentStatus: 'trial',
            paymentMethod: null,
            paymentDate: null,
            plan: 'trial'
        };

        this.trialData = trialData;
        this.saveTrialData(trialData);
    }

    // Security methods to prevent bypassing
    validateAccess() {
        // Check if user has valid access
        if (!this.isTrialActive()) {
            return {
                hasAccess: false,
                reason: 'trial_expired',
                message: 'Your trial has expired. Please upgrade to continue using Rehbar AI.'
            };
        }

        // Check for suspicious activity (multiple device IDs, etc.)
        if (this.detectSuspiciousActivity()) {
            return {
                hasAccess: false,
                reason: 'suspicious_activity',
                message: 'Suspicious activity detected. Please contact support.'
            };
        }

        return {
            hasAccess: true,
            reason: 'valid_access'
        };
    }

    detectSuspiciousActivity() {
        // Check for multiple device IDs in a short time
        const deviceHistory = JSON.parse(localStorage.getItem('rehbar_device_history') || '[]');
        const now = Date.now();
        const recentDevices = deviceHistory.filter(entry => 
            now - entry.timestamp < 24 * 60 * 60 * 1000 // Last 24 hours
        );

        if (recentDevices.length > 3) {
            return true; // Suspicious: too many device changes
        }

        // Add current device to history
        deviceHistory.push({
            deviceId: this.deviceId,
            timestamp: now
        });

        // Keep only last 10 entries
        if (deviceHistory.length > 10) {
            deviceHistory.splice(0, deviceHistory.length - 10);
        }

        localStorage.setItem('rehbar_device_history', JSON.stringify(deviceHistory));
        return false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrialManager;
} else {
    window.TrialManager = TrialManager;
}
