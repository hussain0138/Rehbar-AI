import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PrimaryButton } from '../components/PrimaryButton'
import { GlassCard } from '../components/GlassCard'
import {
  Search,
  MessageSquare,
  Mail,
  Phone,
  Book,
  Video,
  FileText,
  Users,
  Headphones,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Settings,
  Shield,
  Zap,
  Chrome,
  Monitor
} from 'lucide-react'

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    {
      title: "Desktop App Setup",
      icon: <Monitor className="w-6 h-6" />,
      description: "Download, install and configure Rehbar AI Desktop",
      articles: 8
    },
    {
      title: "Voice Recognition",
      icon: <Headphones className="w-6 h-6" />,
      description: "Configure microphone and voice settings",
      articles: 6
    },
    {
      title: "Real-time Assistance",
      icon: <Zap className="w-6 h-6" />,
      description: "Get AI suggestions during conversations",
      articles: 12
    },
    {
      title: "Meeting Integration",
      icon: <Video className="w-6 h-6" />,
      description: "Use with Zoom, Teams, Google Meet",
      articles: 10
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-6 h-6" />,
      description: "Local processing and data protection",
      articles: 5
    },
    {
      title: "Troubleshooting",
      icon: <Settings className="w-6 h-6" />,
      description: "Solve common desktop app issues",
      articles: 8
    }
  ]

  const faqs = [
    {
      question: "How do I download and install Rehbar AI Desktop?",
      answer: "First, sign up for portal access at rehbar-ai.com. Once approved, download the ZIP file from your portal dashboard. Extract the ZIP file to your desired location, then run the .exe file inside. The app will guide you through the initial setup including microphone configuration and API key setup."
    },
    {
      question: "What makes the desktop app different from web-based solutions?",
      answer: "Rehbar AI Desktop runs locally on your computer, providing faster response times, better privacy, and works with any application - not just web browsers. It captures system audio directly, works offline for basic features, and provides more reliable voice recognition without internet dependency."
    },
    {
      question: "How does the desktop app protect my privacy?",
      answer: "Your privacy is our top priority. The desktop app processes conversations locally on your device. No audio data is sent to external servers unless you explicitly enable cloud features. All processing happens on your machine, ensuring your conversations remain completely private and secure."
    },
    {
      question: "Can I use the desktop app with any meeting platform?",
      answer: "Yes! The desktop app works with any application on your computer including Zoom, Microsoft Teams, Google Meet, Skype, Discord, phone calls, and even in-person conversations. It captures system audio and microphone input regardless of the platform you're using."
    },
    {
      question: "What are the system requirements for the desktop app?",
      answer: "Windows 10 or later, 4GB RAM minimum (8GB recommended), 2GB free storage, and a working microphone. The app is lightweight and runs efficiently in the background without impacting your system performance."
    },
    {
      question: "How does the real-time AI assistance work?",
      answer: "The desktop app listens to your conversations in real-time and provides intelligent suggestions through a discreet overlay window. It analyzes speech patterns, context, and conversation flow to offer relevant responses, follow-up questions, and talking points. The suggestions appear instantly without interrupting your conversation flow."
    },
    {
      question: "Can I customize the AI suggestions for different scenarios?",
      answer: "Absolutely! The desktop app includes preset modes for interviews, sales calls, meetings, presentations, and casual conversations. You can also create custom profiles with specific talking points, upload relevant documents, and train the AI to understand your communication style and preferences."
    },
    {
      question: "How do I configure my microphone and audio settings?",
      answer: "During initial setup, the app will detect your available microphones and speakers. You can adjust sensitivity, noise cancellation, and audio quality in the settings. The app includes a built-in audio test to ensure optimal voice recognition performance."
    },
    {
      question: "What should I do if the app isn't recognizing my voice properly?",
      answer: "First, check your microphone settings and ensure it's not muted. Try adjusting the sensitivity in audio settings. If issues persist, run the voice calibration tool in settings to train the app to better recognize your voice patterns and accent."
    },
    {
      question: "Can I use the desktop app for phone calls?",
      answer: "Yes! The desktop app can capture audio from phone calls made through your computer (VoIP, Skype, WhatsApp calls, etc.). For mobile phone calls, you can use the app's 'Phone Mode' which listens through your computer's microphone while you're on speaker phone."
    }
  ]

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageSquare className="w-8 h-8" />,
      action: "Start Chat",
      available: "24/7"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="w-8 h-8" />,
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: <Phone className="w-8 h-8" />,
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM PST"
    },
    {
      title: "Video Tutorial",
      description: "Watch step-by-step guides",
      icon: <Video className="w-8 h-8" />,
      action: "Watch Videos",
      available: "50+ tutorials"
    }
  ]

  const quickLinks = [
    { title: "Download Desktop App", icon: <Monitor className="w-5 h-5" />, href: "/desktop" },
    { title: "Portal Access", icon: <Shield className="w-5 h-5" />, href: "/login" },
    { title: "Setup Guide", icon: <Book className="w-5 h-5" />, href: "/setup" },
    { title: "Voice Configuration", icon: <Headphones className="w-5 h-5" />, href: "/voice-setup" },
    { title: "Feature Requests", icon: <Zap className="w-5 h-5" />, href: "/feedback" },
    { title: "System Status", icon: <Settings className="w-5 h-5" />, href: "/status" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black pt-16"
    >
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-satoshi font-black text-white mb-6">
              How can we{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">help you?</span>
            </h1>

            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of Rehbar AI
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search for help articles, features, or common questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gradient-blue-a focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white mb-4">
              Browse Help Categories
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Find detailed guides and tutorials organized by topic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    {category.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white/70 mb-4">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{category.articles} articles</span>
                    <ExternalLink className="w-4 h-4 text-white/60" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Quick answers to the most common questions about Rehbar AI
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <GlassCard className="overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0" />
                    )}
                  </button>

                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-white/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white mb-4">
              Need More Help?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our support team is here to help you succeed with Rehbar AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {option.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-white/70 mb-4">{option.description}</p>
                  <p className="text-white/60 text-sm mb-6">{option.available}</p>

                  <PrimaryButton className="w-full">
                    {option.action}
                  </PrimaryButton>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white mb-4">
              Quick Links
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Jump to the most popular resources and tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.href}
                className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{link.title}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/60" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-black mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Our team is standing by to help you get the most out of Rehbar AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton
                size="lg"
                className="bg-black text-white hover:bg-gray-900"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Live Chat
              </PrimaryButton>
              <PrimaryButton
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </PrimaryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
