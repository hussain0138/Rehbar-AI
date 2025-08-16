import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class CustomizeView extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 20px;
            color: white;
            min-height: 400px;
        }

        .settings-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .settings-section {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .section-title {
            color: #3b82f6;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            color: white;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 14px;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 6px;
            color: white;
            font-size: 14px;
            transition: border-color 0.2s;
        }

        .form-control:focus {
            outline: none;
            border-color: #3b82f6;
        }

        .current-selection {
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            font-weight: normal;
        }

        .form-description {
            color: rgba(255, 255, 255, 0.6);
            font-size: 12px;
            margin-top: 5px;
        }

        input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            cursor: pointer;
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: rgba(59, 130, 246, 0.3);
            outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid rgba(59, 130, 246, 0.3);
            transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
            background: #2563eb;
            transform: scale(1.1);
        }

        input[type="range"]::-moz-range-thumb {
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid rgba(59, 130, 246, 0.3);
            transition: all 0.2s ease;
        }

        input[type="range"]::-moz-range-thumb:hover {
            background: #2563eb;
            transform: scale(1.1);
        }
    `;

    static properties = {
        selectedProfile: { type: String },
        selectedLanguage: { type: String },
        selectedScreenshotInterval: { type: String },
        selectedImageQuality: { type: String },
        layoutMode: { type: String },
        advancedMode: { type: Boolean },
        googleSearchEnabled: { type: Boolean },
        backgroundTransparency: { type: Number },
        fontSize: { type: Number },
        onProfileChange: { type: Function },
        onLanguageChange: { type: Function },
        onScreenshotIntervalChange: { type: Function },
        onImageQualityChange: { type: Function },
        onLayoutModeChange: { type: Function },
        onAdvancedModeChange: { type: Function },
    };

    constructor() {
        super();
        this.selectedProfile = 'interview';
        this.selectedLanguage = 'en-US';
        this.selectedScreenshotInterval = '5';
        this.selectedImageQuality = 'medium';
        this.layoutMode = 'normal';
        this.advancedMode = false;
        this.googleSearchEnabled = (localStorage.getItem('googleSearchEnabled') || 'true') === 'true';
        this.backgroundTransparency = parseInt(localStorage.getItem('backgroundTransparency') || '90', 10);
        this.fontSize = parseInt(localStorage.getItem('fontSize') || '18', 10);
        this.onProfileChange = () => {};
        this.onLanguageChange = () => {};
        this.onScreenshotIntervalChange = () => {};
        this.onImageQualityChange = () => {};
        this.onLayoutModeChange = () => {};
        this.onAdvancedModeChange = () => {};
    }

    connectedCallback() {
        super.connectedCallback();
        // Apply current settings when component loads
        this.applyBackgroundTransparency();
        this.applyFontSize();
    }

    getProfiles() {
        return [
            { value: 'interview', name: 'Interview Assistant' },
            { value: 'sales', name: 'Sales Support' },
            { value: 'meeting', name: 'Meeting Guide' },
            { value: 'presentation', name: 'Presentation Helper' },
            { value: 'general', name: 'General Conversation' },
        ];
    }

    getLanguages() {
        return [
            { value: 'en-US', name: 'English (US)' },
            { value: 'en-GB', name: 'English (UK)' },
            { value: 'es-ES', name: 'Spanish' },
            { value: 'fr-FR', name: 'French' },
            { value: 'de-DE', name: 'German' },
            { value: 'it-IT', name: 'Italian' },
            { value: 'pt-BR', name: 'Portuguese' },
            { value: 'ru-RU', name: 'Russian' },
            { value: 'ja-JP', name: 'Japanese' },
            { value: 'ko-KR', name: 'Korean' },
            { value: 'zh-CN', name: 'Chinese (Simplified)' },
        ];
    }

    handleProfileSelect(e) {
        this.selectedProfile = e.target.value;
        localStorage.setItem('selectedProfile', this.selectedProfile);
        this.onProfileChange(this.selectedProfile);
    }

    handleLanguageSelect(e) {
        this.selectedLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', this.selectedLanguage);
        this.onLanguageChange(this.selectedLanguage);
    }

    handleScreenshotIntervalSelect(e) {
        this.selectedScreenshotInterval = e.target.value;
        localStorage.setItem('selectedScreenshotInterval', this.selectedScreenshotInterval);
        this.onScreenshotIntervalChange(this.selectedScreenshotInterval);
    }

    handleImageQualitySelect(e) {
        this.selectedImageQuality = e.target.value;
        localStorage.setItem('selectedImageQuality', this.selectedImageQuality);
        this.onImageQualityChange(this.selectedImageQuality);
    }

    handleLayoutModeSelect(e) {
        this.layoutMode = e.target.value;
        localStorage.setItem('layoutMode', this.layoutMode);
        this.onLayoutModeChange(this.layoutMode);
    }

    handleAdvancedModeSelect(e) {
        this.advancedMode = e.target.value === 'true';
        localStorage.setItem('advancedMode', this.advancedMode);
        this.onAdvancedModeChange(this.advancedMode);
    }

    handleGoogleSearchToggle(e) {
        this.googleSearchEnabled = e.target.checked;
        localStorage.setItem('googleSearchEnabled', this.googleSearchEnabled ? 'true' : 'false');
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.invoke('update-google-search-setting', this.googleSearchEnabled).catch(() => {});
        }
    }

    handleBackgroundTransparencyChange(e) {
        this.backgroundTransparency = parseInt(e.target.value, 10);
        localStorage.setItem('backgroundTransparency', this.backgroundTransparency.toString());
        this.applyBackgroundTransparency();
    }

    handleFontSizeChange(e) {
        this.fontSize = parseInt(e.target.value, 10);
        localStorage.setItem('fontSize', this.fontSize.toString());
        this.applyFontSize();
    }

    applyBackgroundTransparency() {
        const opacity = this.backgroundTransparency / 100;
        document.documentElement.style.setProperty('--main-content-background', `rgba(15, 23, 42, ${opacity})`);
        document.documentElement.style.setProperty('--header-background', `rgba(15, 23, 42, ${opacity})`);
        
        // Notify parent app to update its settings
        this.dispatchEvent(new CustomEvent('interface-setting-changed', {
            detail: { 
                type: 'backgroundTransparency', 
                value: this.backgroundTransparency 
            },
            bubbles: true,
            composed: true
        }));
    }

    applyFontSize() {
        document.documentElement.style.setProperty('--response-font-size', `${this.fontSize}px`);
        
        // Notify parent app to update its settings
        this.dispatchEvent(new CustomEvent('interface-setting-changed', {
            detail: { 
                type: 'fontSize', 
                value: this.fontSize 
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const profiles = this.getProfiles();
        const languages = this.getLanguages();
        const currentProfile = profiles.find(p => p.value === this.selectedProfile);
        const currentLanguage = languages.find(l => l.value === this.selectedLanguage);

        return html`
            <div class="settings-container">
                <!-- AI Profile Section -->
                <div class="settings-section">
                    <div class="section-title">⚙️ AI Profile & Behavior</div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            Profile Type
                            <span class="current-selection">(Current: ${currentProfile?.name || 'Unknown'})</span>
                        </label>
                        <select class="form-control" .value=${this.selectedProfile} @change=${this.handleProfileSelect}>
                            ${profiles.map(profile => html`
                                <option value=${profile.value} ?selected=${this.selectedProfile === profile.value}>
                                    ${profile.name}
                                </option>
                            `)}
                        </select>
                        <div class="form-description">Choose the AI assistant profile that best fits your conversation type</div>
                    </div>
                </div>

                <!-- Language Section -->
                <div class="settings-section">
                    <div class="section-title">🌐 Language & Speech</div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            Speech Language
                            <span class="current-selection">(Current: ${currentLanguage?.name || 'Unknown'})</span>
                        </label>
                        <select class="form-control" .value=${this.selectedLanguage} @change=${this.handleLanguageSelect}>
                            ${languages.map(language => html`
                                <option value=${language.value} ?selected=${this.selectedLanguage === language.value}>
                                    ${language.name}
                                </option>
                            `)}
                        </select>
                        <div class="form-description">Language for speech recognition and AI responses</div>
                    </div>
                </div>

                <!-- Screenshot Section -->
                <div class="settings-section">
                    <div class="section-title">📸 Screen Capture</div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            Capture Interval
                            <span class="current-selection">(Current: ${this.selectedScreenshotInterval === 'manual' ? 'Manual' : this.selectedScreenshotInterval + ' seconds'})</span>
                        </label>
                        <select class="form-control" .value=${this.selectedScreenshotInterval} @change=${this.handleScreenshotIntervalSelect}>
                            <option value="manual">Manual Only</option>
                            <option value="3">Every 3 seconds</option>
                            <option value="5">Every 5 seconds</option>
                            <option value="10">Every 10 seconds</option>
                            <option value="15">Every 15 seconds</option>
                            <option value="30">Every 30 seconds</option>
                        </select>
                        <div class="form-description">How often to automatically capture screenshots for AI analysis</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Image Quality
                            <span class="current-selection">(Current: ${this.selectedImageQuality})</span>
                        </label>
                        <select class="form-control" .value=${this.selectedImageQuality} @change=${this.handleImageQualitySelect}>
                            <option value="high">High Quality</option>
                            <option value="medium">Medium Quality</option>
                            <option value="low">Low Quality</option>
                        </select>
                        <div class="form-description">Higher quality uses more tokens but provides better AI analysis</div>
                    </div>
                </div>

                <!-- Interface Section -->
                <div class="settings-section">
                    <div class="section-title">🖥️ Interface & Layout</div>
                    
                    <div class="form-group">
                        <label class="form-label">
                            Layout Mode
                            <span class="current-selection">(Current: ${this.layoutMode})</span>
                        </label>
                        <select class="form-control" .value=${this.layoutMode} @change=${this.handleLayoutModeSelect}>
                            <option value="compact">Compact</option>
                            <option value="normal">Normal</option>
                        </select>
                        <div class="form-description">Choose between compact or normal window size</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Background Transparency
                            <span class="current-selection">(Current: ${this.backgroundTransparency}%)</span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            .value=${this.backgroundTransparency} 
                            @input=${this.handleBackgroundTransparencyChange}
                            class="form-control"
                        />
                        <div class="form-description">Adjust the transparency of the app background (0% = fully transparent, 100% = fully opaque)</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Font Size
                            <span class="current-selection">(Current: ${this.fontSize}px)</span>
                        </label>
                        <input 
                            type="range" 
                            min="12" 
                            max="32" 
                            .value=${this.fontSize} 
                            @input=${this.handleFontSizeChange}
                            class="form-control"
                        />
                        <div class="form-description">Adjust the font size for better readability (12px = small, 32px = large)</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Advanced Mode
                            <span class="current-selection">(Current: ${this.advancedMode ? 'Enabled' : 'Disabled'})</span>
                        </label>
                        <select class="form-control" .value=${this.advancedMode ? 'true' : 'false'} @change=${this.handleAdvancedModeSelect}>
                            <option value="false">Disabled</option>
                            <option value="true">Enabled</option>
                        </select>
                        <div class="form-description">Enable advanced features and developer tools</div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Google Search Tool
                            <span class="current-selection">(Current: ${this.googleSearchEnabled ? 'Enabled' : 'Disabled'})</span>
                        </label>
                        <div>
                            <input type="checkbox" .checked=${this.googleSearchEnabled} @change=${this.handleGoogleSearchToggle} />
                            <span class="form-description">Allow the model to use Google Search when needed</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('customize-view', CustomizeView);
