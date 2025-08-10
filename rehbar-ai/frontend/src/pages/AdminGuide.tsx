import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Users, 
  Settings, 
  Key, 
  Monitor, 
  Download,
  CheckCircle,
  AlertTriangle,
  Lock,
  UserCheck,
  Database
} from 'lucide-react'

const AdminGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-500/20 rounded-full text-red-300 mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Admin Access Only
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Admin Panel Access Guide
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Complete guide for administrators to access the portal, approve users, and manage the desktop application system.
          </p>
        </motion.div>

        {/* Admin Panel Access */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Key className="w-6 h-6 mr-3 text-blue-400" />
            How to Access Admin Panel
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Navigate to Admin Login</h3>
                <p className="text-white/70">Go to <code className="bg-black/30 px-2 py-1 rounded text-blue-300">/admin</code> in your browser URL</p>
                <p className="text-sm text-white/60 mt-1">Example: https://yourwebsite.com/admin</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Enter Admin Credentials</h3>
                <p className="text-white/70">Use your admin username and password</p>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-2">
                  <p className="text-yellow-300 text-sm flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Contact system administrator for credentials if you don't have them
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Access Admin Dashboard</h3>
                <p className="text-white/70">Once logged in, you'll have access to all admin functions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Management */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-purple-400" />
            User Management & Approval
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-green-400" />
                Approve New Users
              </h3>
              <ul className="text-white/70 space-y-2">
                <li>• Review pending user registrations</li>
                <li>• Verify user credentials and eligibility</li>
                <li>• Grant or deny portal access</li>
                <li>• Send approval/rejection notifications</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-400" />
                Manage Existing Users
              </h3>
              <ul className="text-white/70 space-y-2">
                <li>• View all registered users</li>
                <li>• Suspend or reactivate accounts</li>
                <li>• Reset user passwords</li>
                <li>• Monitor download activity</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Desktop App Management */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Monitor className="w-6 h-6 mr-3 text-cyan-400" />
            Desktop App Management
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Download className="w-5 h-5 mr-2 text-green-400" />
                App Distribution
              </h3>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-white/80 mb-3">Current system setup:</p>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Desktop app is packaged as ZIP file (168MB)</li>
                  <li>• Users download → extract → run RehbarAI.exe</li>
                  <li>• Only approved portal users can download</li>
                  <li>• Download links are protected and tracked</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-purple-400" />
                Admin Responsibilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="text-green-300 font-medium mb-2">Regular Tasks</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Monitor download statistics</li>
                    <li>• Update app versions</li>
                    <li>• Review user feedback</li>
                    <li>• Manage server resources</li>
                  </ul>
                </div>
                
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="text-orange-300 font-medium mb-2">Security Tasks</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Verify SHA256 hashes</li>
                    <li>• Monitor unauthorized access</li>
                    <li>• Update security protocols</li>
                    <li>• Backup user data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 p-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
            Quick Admin Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-4 text-left transition-all duration-300 group">
              <Users className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">View Pending Users</h3>
              <p className="text-white/60 text-sm">Review and approve new registrations</p>
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-4 text-left transition-all duration-300 group">
              <Download className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Download Stats</h3>
              <p className="text-white/60 text-sm">Monitor app download activity</p>
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-4 text-left transition-all duration-300 group">
              <Settings className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">System Settings</h3>
              <p className="text-white/60 text-sm">Configure portal and app settings</p>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default AdminGuide
