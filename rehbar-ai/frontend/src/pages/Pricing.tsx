import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
} from 'lucide-react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { planService, userProfileService, PlanDetails } from '../services/firestore';
// import PrimaryButton from '../components/PrimaryButton';

const WA_NUMBER = '601129081180'; // +60 11-2908 1180 -> wa.me format (no plus / spaces)

const Pricing: React.FC = () => {
  const [plans, setPlans] = useState<PlanDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [requesting, setRequesting] = useState<string | null>(null); // Track which plan is being requested
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchPlans();

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('🔐 Auth state changed:', currentUser ? currentUser.uid : 'No user');
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const fetchPlans = async () => {
    try {
      console.log('🔍 Fetching plans from Firestore...');

      // Start with default plans as fallback
      let finalPlans = getDefaultPlans();
      console.log('📋 Starting with default plans:', finalPlans.length, 'plans');

      try {
        const firestorePlans = await planService.getAvailablePlans();
        console.log('📋 Firestore plans result:', firestorePlans);

        if (firestorePlans && firestorePlans.length > 0) {
          // Convert Firestore plans to match our format
          finalPlans = firestorePlans.map(plan => ({
            ...plan,
            popular: plan.popular || false,
            trialDays: plan.trialDays || 0
          }));
          console.log('✅ Using Firestore plans:', finalPlans.length, 'plans');
        } else {
          console.log('📝 No plans in Firestore, using default plans directly...');
          console.log('✅ Using default plans:', finalPlans.length, 'plans');
        }
      } catch (firestoreError) {
        console.error('❌ Firestore error:', firestoreError);
        console.log('📋 Using fallback default plans due to error');
      }

      console.log('📋 Final plans to display:', finalPlans);
      setPlans(finalPlans);

    } catch (error) {
      console.error('❌ Critical error in fetchPlans:', error);
      // Ultimate fallback
      const fallbackPlans = getDefaultPlans();
      console.log('📋 Using ultimate fallback plans:', fallbackPlans.length, 'plans');
      setPlans(fallbackPlans);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultPlans = async () => {
    try {
      const defaultPlans = getDefaultPlans();
      for (const plan of defaultPlans) {
        await planService.createPlan(plan);
        console.log(`✅ Created plan: ${plan.name}`);
      }
      console.log('🎉 All default plans created!');
    } catch (error) {
      console.error('❌ Error creating default plans:', error);
    }
  };

  const getDefaultPlans = (): PlanDetails[] => [
    {
      id: 'free-trial',
      name: 'Free Trial - Just One Dollar',
      price: 1,
      duration: '3 days',
      features: [
        'Basic AI assistance',
        '5 meetings per day',
        '30 voice minutes per day',
        '50 AI suggestions per day',
        'Email support'
      ],
      limits: {
        meetingsPerDay: 5,
        voiceMinutesPerDay: 30,
        aiSuggestionsPerDay: 50
      }
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 9.99,
      duration: 'month',
      features: [
        'Advanced AI assistance',
        'Unlimited meetings',
        '300 voice minutes per day',
        '500 AI suggestions per day',
        'Priority support',
        'Chrome extension',
        'Meeting transcripts'
      ],
      limits: {
        meetingsPerDay: -1,
        voiceMinutesPerDay: 300,
        aiSuggestionsPerDay: 500
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 19.99,
      duration: 'month',
      features: [
        'Premium AI assistance',
        'Unlimited everything',
        'Custom integrations',
        'Dedicated support',
        'Team management',
        'Advanced analytics',
        'Custom branding',
        'API access'
      ],
      limits: {
        meetingsPerDay: -1,
        voiceMinutesPerDay: -1,
        aiSuggestionsPerDay: -1
      }
    }
  ];

  const formatPrice = (p?: number) => {
    if (p === undefined || p === null) return '-';
    if (p === 0) return 'Free';
    return `$${Number(p).toFixed(2)}`;
  };

  const handlePlanSelection = async (planId: string) => {
    // Prevent multiple clicks for the same plan
    if (requesting === planId) {
      console.log('⚠️ Plan request already in progress for:', planId);
      return;
    }

    // Prevent any other plan requests while one is processing
    if (requesting) {
      console.log('⚠️ Another plan request in progress, ignoring click for:', planId);
      return;
    }

    console.log('🔄 Starting plan selection for:', planId);

    if (!user) {
      console.log('❌ No user found, redirecting to auth');
      alert('Please sign in to select a plan');
      window.location.href = '/auth';
      return;
    }

    console.log('👤 User found:', user.uid, user.email);

    setRequesting(planId); // Set the specific plan being requested
    try {
      console.log('📝 Requesting plan approval for:', planId);
      const approvalId = await planService.requestPlanApproval(user.uid, planId);
      console.log('✅ Plan request successful, approval ID:', approvalId);

      alert('Plan request submitted successfully! Please wait for admin approval.');
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('❌ Error requesting plan:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack,
        planId: planId,
        userId: user?.uid
      });

      let errorMessage = 'Failed to request plan. Please try again.';

      if (error.message?.includes('User or plan not found')) {
        errorMessage = 'User or plan information not found. Please try signing out and back in.';
      } else if (error.message?.includes('permission')) {
        errorMessage = 'Permission denied. Please check your account status.';
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firestore security rules.';
      }

      alert(errorMessage);
    } finally {
      setRequesting(null); // Clear the requesting state
    }
  };

  const getPlanIcon = (planName: string) => {
    const n = planName.toLowerCase();
    if (n.includes('free')) return <Sparkles className="h-8 w-8 text-blue-500" />;
    if (n.includes('pro')) return <Zap className="h-8 w-8 text-purple-500" />;
    if (n.includes('enter')) return <Shield className="h-8 w-8 text-yellow-500" />;
    return <Star className="h-8 w-8 text-gray-500" />;
  };

  const getPlanColor = (planName: string) => {
    const n = planName.toLowerCase();
    if (n.includes('free')) return 'from-blue-500 to-cyan-500';
    if (n.includes('pro')) return 'from-purple-500 to-pink-500';
    if (n.includes('enter')) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  const isPopular = (planName: string) => {
    return planName.toLowerCase().includes('pro') || planName.toLowerCase().includes('professional');
  };

  // Create the default WhatsApp message
  const getWhatsAppMessage = (plan?: PlanDetails) => {
    const planText = plan ? `${plan.name} - ${formatPrice(plan.price)} / ${plan.duration}` : 'support / payment';
    const userText = user ? `User ID: ${user.uid || 'N/A'} | Email: ${user.email || 'N/A'}` : 'User: Guest';
    return `Hi Rehbar team,%0AI'd like to pay for the following: ${planText}.%0A${userText}%0A%0APlease send payment instructions and confirm extension details. Thanks!`;
  };

  const getWhatsAppLink = (plan?: PlanDetails) => {
    const msg = getWhatsAppMessage(plan);
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  };

  if (loading) {
    console.log('🔄 Pricing page is in loading state...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing plans...</p>
          <p className="text-sm text-gray-500 mt-2">Check console for debugging info</p>
        </div>
      </div>
    );
  }

  console.log('🎨 Pricing page rendering with plans:', plans.length, 'plans');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-blue-600">AI Assistant</span> Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the power of AI-driven productivity with our flexible pricing plans. 
            Start with a free trial and upgrade as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans && plans.length > 0 ? (
            plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                  isPopular(plan.name) ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                {/* Popular Badge */}
                {isPopular(plan.name) && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${getPlanColor(plan.name)} flex items-center justify-center`}>
                      {getPlanIcon(plan.name)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">{formatPrice(plan.price)}</span>
                      <span className="text-gray-600">/{plan.duration}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Limits */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Daily Limits
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Meetings:</span>
                        <span className="font-medium">
                          {plan.limits.meetingsPerDay === -1 ? 'Unlimited' : plan.limits.meetingsPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Voice Minutes:</span>
                        <span className="font-medium">
                          {plan.limits.voiceMinutesPerDay === -1 ? 'Unlimited' : plan.limits.voiceMinutesPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Suggestions:</span>
                        <span className="font-medium">
                          {plan.limits.aiSuggestionsPerDay === -1 ? 'Unlimited' : plan.limits.aiSuggestionsPerDay}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="space-y-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🖱️ Button clicked for plan:', plan.id, plan.name);
                        handlePlanSelection(plan.id);
                      }}
                      disabled={requesting === plan.id || requesting !== null}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center ${
                        isPopular(plan.name)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl'
                      } ${requesting === plan.id || requesting !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {requesting === plan.id ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : requesting !== null ? (
                        <>
                          {plan.price === 0 ? 'Start Free Trial' : 'Request Plan'}
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      ) : (
                        <>
                          {plan.price === 0 ? 'Start Free Trial' : 'Request Plan'}
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </button>

                    {/* Pay via WhatsApp */}
                    <a
                      href={getWhatsAppLink(plan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow"
                      onClick={() => {
                        console.log('➡️ Redirecting to WhatsApp for plan:', plan.id, 'link:', getWhatsAppLink(plan));
                      }}
                    >
                      <Phone className="w-5 h-5" />
                      Pay via WhatsApp (Quick)
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-red-500 text-lg font-semibold">
                No plans available ({plans.length} plans loaded)
              </div>
              <p className="text-gray-600 mt-2">
                Please check the console for debugging information.
              </p>
            </div>
          )}
        </div>

        {/* Payment / WhatsApp Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pay & Extend Your Plan</h2>
              <p className="text-gray-600 mb-4">
                Want to pay quickly and get your plan extended right away? Message our payments team on WhatsApp at <span className="font-semibold">+60 11-2908 1180</span>. Click the button to open a chat with a pre-filled message — our admin will reply with payment instructions and confirm your extension once payment is verified.
              </p>

              <ul className="text-sm text-gray-600 space-y-2">
                <li>• After messaging, you will receive bank transfer / e-wallet instructions.</li>
                <li>• Send a screenshot of your payment for faster verification.</li>
                <li>• Payments are manually verified by our team (expected within 1–24 hours during business hours).</li>
                <li>• Keep your account email or user ID handy and include it in the WhatsApp message.</li>
              </ul>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center md:items-end">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Rehbar team, I'd like to pay and extend my plan. My user/email: (please add) -- Thanks!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-2xl shadow-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Message Payments on WhatsApp
              </a>

              <div className="mt-3 text-xs text-gray-500 text-right">
                Business hours: Mon–Fri, 9am–6pm MYT<br />
                For urgent inquiries, include "URGENT" in your message.
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">How does the approval process work?</h3>
              <p className="text-gray-600">After selecting a plan, your request will be reviewed by our admin team. You'll receive an email notification once approved.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Can I change plans later?</h3>
              <p className="text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Contact support for assistance with plan changes.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">What happens after the free trial?</h3>
              <p className="text-gray-600">Your free trial lasts 3 days. After that, you'll need to select a paid plan to continue using the service.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Is there a refund policy?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee for all paid plans. Contact support if you're not satisfied.</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-blue-100 mb-6">Our team is here to help you find the perfect plan for your needs.</p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating WhatsApp widget */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Rehbar team, I need payment / extension details. My user/email: (please add) -- Thanks!")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-3 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform"
        onClick={() => console.log('🟢 WhatsApp widget clicked')}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 12.08c0 4.97-4.03 9-9 9-1.57 0-3.03-.41-4.33-1.13L3 21l1.2-4.66C3.36 14.8 3 13.44 3 12.08 3 7.11 7.03 3.08 12 3.08s9 4.03 9 9z" fill="white" opacity="0.06"></path>
          <path d="M17.5 14.5c-.3-.16-1.77-.86-2.05-.97-.28-.11-.48-.16-.68.16s-.78.97-.96 1.17c-.18.2-.35.22-.65.08-.3-.14-1.27-.47-2.41-1.48-.89-.78-1.49-1.73-1.66-2.04-.17-.31-.02-.48.12-.62.12-.12.28-.31.42-.46.14-.15.18-.25.28-.42.09-.17.05-.3-.03-.45-.08-.15-.68-1.64-.93-2.24-.25-.6-.51-.52-.69-.53l-.59-.01c-.2 0-.52.07-.8.27-.28.2-1.06 1.04-1.06 2.53 0 1.49 1.09 2.93 1.24 3.14.15.21 2.14 3.46 5.18 4.85 3.04 1.4 3.04.93 3.59.87.55-.06 1.77-.72 2.03-1.41.26-.69.26-1.28.18-1.41-.08-.13-.28-.21-.58-.37z" fill="white"></path>
        </svg>

        <div className="flex flex-col leading-tight text-left">
          <span className="font-semibold text-sm">Pay via WhatsApp</span>
          <span className="text-xs text-white/90">+60 11-2908 1180</span>
        </div>
      </a>
    </div>
  );
};

export default Pricing;
