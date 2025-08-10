import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Facebook,
  Instagram
} from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Desktop App', href: '/desktop' },
      { name: 'Portal Access', href: '/login' },
      { name: 'Voice Assistant', href: '/features' },
      { name: 'Real-time AI', href: '/dashboard' },
      { name: 'Download', href: '/desktop' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about' },
      { name: 'Egenie AI', href: '/sponsor' },
      { name: 'Pakistan Office', href: '/contact' },
      { name: 'Malaysia Office', href: '/contact' }
    ],
    resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Setup Guide', href: '/help' },
      { name: 'Voice Config', href: '/help' },
      { name: 'Troubleshooting', href: '/help' },
      { name: 'System Status', href: '/status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Data Security', href: '/security' },
      { name: 'Local Processing', href: '/privacy' },
      { name: 'GDPR Compliance', href: '/gdpr' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/rehbarai' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/rehbarai' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/rehbarai' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@rehbarai' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/rehbarai' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/rehbarai' }
  ]

  return (
    <footer className="bg-primary-950 border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <Logo size="lg" showText={false} />
            </Link>
            
            <p className="text-white/70 mb-6 max-w-sm">
              Revolutionary AI-powered conversation assistant. Developed in Pakistan and Malaysia,
              sponsored by Egenie AI. Download our desktop app for intelligent real-time guidance.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/60">
                <Mail className="w-4 h-4" />
                <span>contact@rehbar-ai.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/60">
                <MapPin className="w-4 h-4" />
                <span>Blue Area, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3 text-white/60">
                <MapPin className="w-4 h-4" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center space-x-3 text-white/60 mt-4 pt-3 border-t border-white/10">
                <span className="text-blue-400 font-medium">Sponsored by Egenie AI</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/60 mb-4">
              Get the latest updates on new features and improvements.
            </p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-modern flex-1"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-primary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} Rehbar AI. Developed in Pakistan & Malaysia. Sponsored by Egenie AI. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
