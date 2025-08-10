import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PrimaryButton } from '../components/PrimaryButton'
import { Chrome, Monitor, Lock, ArrowRight, CheckCircle } from 'lucide-react'

export default function Download() {
  const [showRedirect, setShowRedirect] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    if (!token) {
      // Show redirect message for a moment, then redirect to signup
      setTimeout(() => {
        setShowRedirect(true)
      }, 2000)
    }
  }, [])

  if (showRedirect) {
    return <Navigate to="/signup" replace />
  }

  // Check if user is authenticated
  const token = localStorage.getItem('token')
  if (token) {
    // User is authenticated, show download portal
    return <DownloadPortal />
  }

  // Show authentication required message
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        className="text-center max-w-md mx-auto px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-satoshi font-bold text-white mb-4">
          Sign Up Required
        </h1>

        <p className="text-white/70 mb-8">
          To download Rehbar AI and access all features, please create your free account first. 
          Choose your plan and get instant access to downloads!
        </p>

        <div className="space-y-4">
          <Link to="/signup">
            <PrimaryButton className="w-full">
              Create Free Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </PrimaryButton>
          </Link>
          
          <Link to="/login">
            <button className="w-full py-3 px-4 text-white/80 hover:text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300">
              Already have an account? Sign In
            </button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-center space-x-2 text-sm text-white/60 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>3-Day Free Trial</span>
          </div>
          <p className="text-xs text-white/50">
            No credit card required • Cancel anytime
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Download Portal for authenticated users
function DownloadPortal() {
  const [selectedOS, setSelectedOS] = useState(() => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Windows')) return 'windows'
    if (userAgent.includes('Mac')) return 'macos'
    if (userAgent.includes('Linux')) return 'linux'
    return 'windows'
  })

  const osOptions = [
    { id: 'windows', name: 'Windows', icon: '🪟', ext: '.exe' },
    { id: 'macos', name: 'macOS', icon: '🍎', ext: '.dmg' },
    { id: 'linux', name: 'Linux', icon: '🐧', ext: '.AppImage' }
  ]

  const handleDownload = () => {
    const selectedOSData = osOptions.find(os => os.id === selectedOS)

    // GitHub Releases download URLs
    const downloadUrls = {
      windows: 'https://github.com/hussain0138/Rehbar-AI/releases/download/v1.0.0/Rehbar-AI-Desktop-v1.0.0.zip',
      macos: 'https://github.com/hussain0138/Rehbar-AI/releases/download/v1.0.0/Rehbar-AI-Desktop-macOS-v1.0.0.zip',
      linux: 'https://github.com/hussain0138/Rehbar-AI/releases/download/v1.0.0/Rehbar-AI-Desktop-Linux-v1.0.0.zip'
    }

    // For Windows, we have the actual executable
    if (selectedOS === 'windows') {
      const downloadUrl = downloadUrls.windows
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'Rehbar-AI-Desktop-v1.0.0.zip'
      link.click()

      // Show success message
      alert('Download started! The Rehbar AI desktop app is being downloaded.')
    } else {
      // For other platforms, show coming soon message
      alert(`${selectedOSData?.name} version is coming soon! Currently only Windows version is available.`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black pt-16"
    >
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-satoshi font-black text-white mb-6">
              Download{' '}
              <span className="text-gradient-blue">Rehbar AI Desktop</span>
            </h1>

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Access the exclusive desktop application with offline capabilities and advanced AI features.
            </p>

            <div className="max-w-2xl mx-auto">
              {/* OS Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Select Your Operating System:</h3>
                <div className="flex justify-center gap-4">
                  {osOptions.map((os) => (
                    <button
                      key={os.id}
                      onClick={() => setSelectedOS(os.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        selectedOS === os.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="text-2xl mr-2">{os.icon}</span>
                      {os.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop App Download */}
              <motion.div
                className="glass-card p-8 text-center hover:bg-white/20 transition-all duration-300 max-w-md mx-auto"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Monitor className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-satoshi font-bold text-white mb-4">
                  Rehbar AI Desktop
                </h3>

                <p className="text-white/70 mb-6">
                  Full-featured desktop application with offline mode, local AI processing, and advanced features.
                </p>

                <div className="space-y-4">
                  <PrimaryButton
                    className="w-full"
                    onClick={handleDownload}
                  >
                    <Monitor className="w-5 h-5 mr-2" />
                    Download for {osOptions.find(os => os.id === selectedOS)?.name}
                  </PrimaryButton>

                  <div className="text-xs text-white/60">
                    File: rehbar-ai-{selectedOS}{osOptions.find(os => os.id === selectedOS)?.ext}
                  </div>
                </div>

                <div className="mt-6 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-200 text-sm">
                    ✅ Portal Access Verified
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Installation Instructions */}
            <motion.div
              className="mt-16 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-satoshi font-bold text-white mb-8">
                Installation Instructions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    🪟 Windows
                  </h3>
                  <ol className="text-white/70 text-sm space-y-2">
                    <li>1. Download the .exe file</li>
                    <li>2. Run the installer</li>
                    <li>3. Follow setup wizard</li>
                    <li>4. Launch from Start Menu</li>
                    <li>5. Sign in with your portal account</li>
                  </ol>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    🍎 macOS
                  </h3>
                  <ol className="text-white/70 text-sm space-y-2">
                    <li>1. Download the .dmg file</li>
                    <li>2. Open the disk image</li>
                    <li>3. Drag app to Applications</li>
                    <li>4. Launch from Applications</li>
                    <li>5. Sign in with your portal account</li>
                  </ol>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    🐧 Linux
                  </h3>
                  <ol className="text-white/70 text-sm space-y-2">
                    <li>1. Download the .AppImage file</li>
                    <li>2. Make it executable (chmod +x)</li>
                    <li>3. Run the AppImage</li>
                    <li>4. Optional: Add to menu</li>
                    <li>5. Sign in with your portal account</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
