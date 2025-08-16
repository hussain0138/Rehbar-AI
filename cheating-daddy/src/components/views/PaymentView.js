import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class PaymentView extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 20px;
            color: white;
            min-height: 400px;
        }

        .payment-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .payment-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .payment-header h1 {
            color: #3b82f6;
            font-size: 28px;
            margin-bottom: 10px;
        }

        .payment-header p {
            color: var(--description-color);
            font-size: 16px;
        }

        .plans-section {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
        }

        .plans-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 24px;
        }

        .plan-card {
            background: rgba(30, 64, 175, 0.1);
            border: 2px solid rgba(59, 130, 246, 0.2);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .plan-card:hover {
            border-color: rgba(59, 130, 246, 0.6);
            transform: translateY(-2px);
        }

        .plan-card.selected {
            border-color: #3b82f6;
            background: rgba(59, 130, 246, 0.1);
        }

        .plan-name {
            font-size: 20px;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 8px;
        }

        .plan-price {
            font-size: 32px;
            font-weight: 700;
            color: white;
            margin-bottom: 16px;
        }

        .plan-features {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .plan-features li {
            padding: 4px 0;
            color: var(--description-color);
        }

        .plan-features li:before {
            content: "✓";
            color: #10b981;
            font-weight: bold;
            margin-right: 8px;
        }

        .payment-form {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            padding: 24px;
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
            padding: 12px;
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

        .payment-methods {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
            margin-bottom: 20px;
        }

        .payment-method {
            background: rgba(30, 64, 175, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 6px;
            padding: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .payment-method:hover {
            border-color: #3b82f6;
            background: rgba(59, 130, 246, 0.1);
        }

        .payment-method.selected {
            border-color: #3b82f6;
            background: rgba(59, 130, 246, 0.2);
        }

        .payment-method-icon {
            font-size: 24px;
            margin-bottom: 4px;
        }

        .payment-method-name {
            font-size: 12px;
            color: var(--description-color);
        }

        .submit-button {
            width: 100%;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 14px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .submit-button:hover {
            background: #2563eb;
        }

        .submit-button:disabled {
            background: #6b7280;
            cursor: not-allowed;
        }

        .trial-info {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            text-align: center;
        }

        .trial-info h3 {
            color: #10b981;
            margin-bottom: 8px;
        }

        .trial-progress {
            background: rgba(16, 185, 129, 0.2);
            border-radius: 4px;
            height: 8px;
            margin: 12px 0;
            overflow: hidden;
        }

        .trial-progress-bar {
            background: #10b981;
            height: 100%;
            transition: width 0.3s ease;
        }

        .status-message {
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 16px;
            text-align: center;
        }

        .status-message.success {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            color: #10b981;
        }

        .status-message.error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }

        .status-message.info {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            color: #3b82f6;
        }
    `;

    static properties = {
        selectedPlan: { type: String },
        selectedPaymentMethod: { type: String },
        paymentReference: { type: String },
        isSubmitting: { type: Boolean },
        statusMessage: { type: Object },
        trialManager: { type: Object }
    };

    constructor() {
        super();
        this.selectedPlan = 'basic';
        this.selectedPaymentMethod = '';
        this.paymentReference = '';
        this.isSubmitting = false;
        this.statusMessage = null;
        this.trialManager = null;
    }

    connectedCallback() {
        super.connectedCallback();
        // Initialize trial manager
        if (window.TrialManager) {
            this.trialManager = new window.TrialManager();
        }
    }

    selectPlan(plan) {
        this.selectedPlan = plan;
        this.requestUpdate();
    }

    selectPaymentMethod(method) {
        this.selectedPaymentMethod = method;
        this.requestUpdate();
    }

    async handleSubmit() {
        if (!this.selectedPaymentMethod || !this.paymentReference.trim()) {
            this.statusMessage = {
                type: 'error',
                text: 'Please select a payment method and enter a reference number.'
            };
            this.requestUpdate();
            return;
        }

        this.isSubmitting = true;
        this.statusMessage = {
            type: 'info',
            text: 'Verifying payment...'
        };
        this.requestUpdate();

        try {
            const paymentData = {
                method: this.selectedPaymentMethod,
                reference: this.paymentReference.trim(),
                plan: this.selectedPlan
            };

            const result = await this.trialManager.verifyPayment(paymentData);

            if (result.success) {
                this.statusMessage = {
                    type: 'success',
                    text: result.message
                };
                
                // Redirect to main view after successful payment
                setTimeout(() => {
                    this.dispatchEvent(new CustomEvent('payment-success', {
                        detail: { plan: result.plan },
                        bubbles: true,
                        composed: true
                    }));
                }, 2000);
            } else {
                this.statusMessage = {
                    type: 'error',
                    text: result.message
                };
            }
        } catch (error) {
            this.statusMessage = {
                type: 'error',
                text: 'An error occurred during verification. Please try again.'
            };
        }

        this.isSubmitting = false;
        this.requestUpdate();
    }

    getPlans() {
        return [
            {
                id: 'basic',
                name: 'Basic',
                price: '$9.99',
                period: '/month',
                features: [
                    'Core AI assistance',
                    '5 conversations/day',
                    'Basic profiles',
                    'Email support'
                ]
            },
            {
                id: 'pro',
                name: 'Pro',
                price: '$19.99',
                period: '/month',
                features: [
                    'Everything in Basic',
                    'Unlimited conversations',
                    'All profiles',
                    'Conversation history',
                    'Priority support'
                ]
            },
            {
                id: 'premium',
                name: 'Premium',
                price: '$39.99',
                period: '/month',
                features: [
                    'Everything in Pro',
                    'Team collaboration',
                    'Advanced analytics',
                    'Custom integrations',
                    '24/7 support'
                ]
            }
        ];
    }

    getPaymentMethods() {
        return [
            { id: 'easypaisa', name: 'EasyPaisa', icon: '📱' },
            { id: 'jazzcash', name: 'JazzCash', icon: '💳' },
            { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
            { id: 'cash', name: 'Cash', icon: '💵' }
        ];
    }

    render() {
        const plans = this.getPlans();
        const paymentMethods = this.getPaymentMethods();
        const trialInfo = this.trialManager ? this.trialManager.getPaymentInfo() : null;

        return html`
            <div class="payment-container">
                <div class="payment-header">
                    <h1>Upgrade to Premium</h1>
                    <p>Choose your plan and complete payment to continue using Rehbar AI</p>
                </div>

                ${trialInfo ? html`
                    <div class="trial-info">
                        <h3>🕐 Trial Status</h3>
                        <p>${trialInfo.trialProgress.remaining} days remaining in your trial</p>
                        <div class="trial-progress">
                            <div class="trial-progress-bar" style="width: ${trialInfo.trialProgress.percentage}%"></div>
                        </div>
                    </div>
                ` : ''}

                <div class="plans-section">
                    <h2 style="margin-bottom: 20px; color: #3b82f6;">Choose Your Plan</h2>
                    <div class="plans-grid">
                        ${plans.map(plan => html`
                            <div class="plan-card ${this.selectedPlan === plan.id ? 'selected' : ''}" 
                                 @click=${() => this.selectPlan(plan.id)}>
                                <div class="plan-name">${plan.name}</div>
                                <div class="plan-price">${plan.price}<span style="font-size: 16px;">${plan.period}</span></div>
                                <ul class="plan-features">
                                    ${plan.features.map(feature => html`<li>${feature}</li>`)}
                                </ul>
                            </div>
                        `)}
                    </div>
                </div>

                <div class="payment-form">
                    <h2 style="margin-bottom: 20px; color: #3b82f6;">Payment Details</h2>
                    
                    <div class="form-group">
                        <label class="form-label">Payment Method</label>
                        <div class="payment-methods">
                            ${paymentMethods.map(method => html`
                                <div class="payment-method ${this.selectedPaymentMethod === method.id ? 'selected' : ''}"
                                     @click=${() => this.selectPaymentMethod(method.id)}>
                                    <div class="payment-method-icon">${method.icon}</div>
                                    <div class="payment-method-name">${method.name}</div>
                                </div>
                            `)}
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Payment Reference Number</label>
                        <input type="text" 
                               class="form-control" 
                               placeholder="Enter your payment reference number"
                               .value=${this.paymentReference}
                               @input=${(e) => this.paymentReference = e.target.value}
                               ?disabled=${this.isSubmitting} />
                        <small style="color: var(--description-color); margin-top: 4px; display: block;">
                            After making payment, enter the reference number provided by your payment method
                        </small>
                    </div>

                    ${this.statusMessage ? html`
                        <div class="status-message ${this.statusMessage.type}">
                            ${this.statusMessage.text}
                        </div>
                    ` : ''}

                    <button class="submit-button" 
                            @click=${this.handleSubmit}
                            ?disabled=${this.isSubmitting || !this.selectedPaymentMethod || !this.paymentReference.trim()}>
                        ${this.isSubmitting ? 'Verifying...' : 'Verify Payment'}
                    </button>

                    <div style="margin-top: 16px; text-align: center; color: var(--description-color); font-size: 12px;">
                        <p>💡 <strong>How it works:</strong></p>
                        <p>1. Select your plan and payment method</p>
                        <p>2. Make payment using the selected method</p>
                        <p>3. Enter the reference number you receive</p>
                        <p>4. We'll verify and activate your account within 24 hours</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('payment-view', PaymentView);
