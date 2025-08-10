import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../components/PrimaryButton'
import { GlassCard } from '../components/GlassCard'
import { detectOS, getOSDisplayName, getDownloadFileName } from '../utils/osDetect'
import {
  Monitor,
  Download,
  Wifi,
  Shield,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  Hash,
  Lock,
  Users
} from 'lucide-react'

export default function Desktop() {
  const [selectedOS, setSelectedOS] = useState(() => {
    const detected = detectOS()
    return detected.name.toLowerCase().includes('windows') ? 'windows' :
           detected.name.toLowerCase().includes('mac') ? 'macos' : 'linux'
  })

  const osOptions = [
    { id: 'windows', name: 'Windows', icon: '🪟' },
    { id: 'macos', name: 'macOS', icon: '🍎' },
    { id: 'linux', name: 'Linux', icon: '🐧' }
  ]

  const features = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Offline Mode",
      description: "Full functionality without internet connection using local AI models"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Local Whisper",
      description: "Voice processing happens entirely on your device for maximum privacy"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Auto-Update",
      description: "Seamless updates with new features and improvements delivered automatically"
    }
  ]

  const systemRequirements = {
    windows: {
      minimum: ["Windows 10 64-bit", "4GB RAM", "2GB storage", "Microphone"],
      recommended: ["Windows 11", "8GB RAM", "4GB storage", "Quality microphone"]
    },
    macos: {
      minimum: ["macOS 11.0", "4GB RAM", "2GB storage", "Microphone"],
      recommended: ["macOS 13.0+", "8GB RAM", "4GB storage", "Quality microphone"]
    },
    linux: {
      minimum: ["Ubuntu 20.04+", "4GB RAM", "2GB storage", "Microphone"],
      recommended: ["Ubuntu 22.04+", "8GB RAM", "4GB storage", "Quality microphone"]
    }
  }

  const handleDownload = () => {
    // Check if user is authenticated (you can integrate with your auth system)
    const isAuthenticated = localStorage.getItem('authToken') // or your auth check

    if (!isAuthenticated) {
      alert('Please sign in to your portal account to download the desktop app.')
      window.location.href = '/auth'
      return
    }

    if (selectedOS === 'windows') {
      const downloadUrl = '/downloads/Rehbar-AI-Desktop-Final-v1.0.0.zip'
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'Rehbar-AI-Desktop-Final-v1.0.0.zip'
      link.click()

      // Show success message with extraction instructions
      alert('Download started! After download completes:\n1. Extract the ZIP file\n2. Run the .exe file inside\n3. Start using Rehbar AI!')
    } else {
      alert(`${getOSDisplayName(selectedOS)} version is coming soon! Currently only Windows version is available.`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <Monitor className="w-12 h-12 text-gradient-blue mr-4" />
                <span className="text-2xl font-satoshi font-bold text-white">Desktop App</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-satoshi font-black text-white mb-6">
                Powerful AI on Your{' '}
                <span className="text-gradient-blue">Desktop</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8">
                Exclusive desktop application with offline capabilities, local AI processing,
                and seamless integration. Available only through our portal system.
              </p>

              {/* Portal Access Notice */}
              <div className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center mb-2">
                  <Lock className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-blue-400 font-semibold">Portal Access Required</span>
                </div>
                <p className="text-white/70 text-sm">
                  Desktop app downloads are available exclusively to registered portal users.
                  Sign up for free trial or upgrade to access the full desktop experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <PrimaryButton
                  size="lg"
                  className="group"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for {getOSDisplayName(selectedOS)}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </PrimaryButton>

                <Link to="/pricing">
                  <PrimaryButton variant="outline" size="lg">
                    <Users className="w-5 h-5 mr-2" />
                    View Plans
                  </PrimaryButton>
                </Link>
              </div>
              
              {/* Important Note */}
              <motion.div
                className="mt-6 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-2">
                  <Download className="w-5 h-5 text-orange-400 mr-2" />
                  <span className="text-orange-300 font-semibold">Important: ZIP File Download</span>
                </div>
                <p className="text-white/80 text-sm">
                  You will download a ZIP file, not a direct .exe. After downloading, you must extract the ZIP file and then run the .exe file inside.
                </p>
              </motion.div>

              {/* Installation Instructions */}
              <motion.div
                className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Installation Steps
                </h4>
                <ol className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                    <span>Download <code className="bg-black/30 px-1 rounded text-blue-300">Rehbar-AI-Desktop-Final-v1.0.0.zip</code></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                    <span>Extract the ZIP file to your desired folder</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</span>
                    <span>Open the extracted folder and run the <code className="bg-black/30 px-1 rounded text-blue-300">.exe</code> file</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">✓</span>
                    <span>Start using your AI conversation assistant!</span>
                  </li>
                </ol>
              </motion.div>

              {/* SHA256 Hash */}
              <motion.div
                className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center text-sm text-white/60">
                  <Hash className="w-4 h-4 mr-2" />
                  <span className="font-jetbrains">SHA256: Available after download</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div 
                  className="w-full h-96 bg-gradient-to-br from-gradient-blue-a/20 to-electric-violet/20 rounded-2xl glass-card p-8"
                  animate={{ 
                    rotateY: [0, 5, 0],
                    rotateX: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="bg-black/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-white/60 text-sm ml-2">Rehbar AI Desktop</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-blue rounded-full flex items-center justify-center">
                          <Monitor className="w-4 h-4 text-black" />
                        </div>
                        <div className="h-2 bg-white/30 rounded flex-1"></div>
                      </div>
                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                      <div className="h-2 bg-gradient-blue rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Monitor className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-white/80">Desktop Preview</p>
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-blue rounded-2xl blur-2xl opacity-20 -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white mb-4">
              Desktop Features
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need for professional AI assistance on your desktop
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard hover className="h-full">
                  <div className="text-gradient-blue mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/80">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-satoshi font-bold text-white mb-4">
              System Requirements
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Make sure your system meets these requirements for optimal performance
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <h3 className="text-2xl font-satoshi font-bold text-white mb-6">
                  Minimum Requirements
                </h3>
                <div className="space-y-3">
                  {systemRequirements[selectedOS as keyof typeof systemRequirements].minimum.map((req, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      <span className="text-white/80">{req}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <h3 className="text-2xl font-satoshi font-bold text-white mb-6">
                  Recommended
                </h3>
                <div className="space-y-3">
                  {systemRequirements[selectedOS as keyof typeof systemRequirements].recommended.map((req, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-white/80">{req}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gradient-blue-a to-gradient-blue-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-white mb-6">
              Ready for Desktop Power?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Download Rehbar AI and experience the full potential of desktop AI
            </p>
            <PrimaryButton
              size="lg"
              onClick={handleDownload}
              className="bg-white text-black hover:bg-gray-100"
            >
              <Download className="w-5 h-5 mr-2" />
              Download for {getOSDisplayName(selectedOS)}
            </PrimaryButton>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
