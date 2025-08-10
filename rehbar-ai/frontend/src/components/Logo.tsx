import React, { useState } from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  // Simple SVG logo as base64 (guaranteed to work)
  const svgLogo = `data:image/svg+xml;base64,${btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="#60A5FA" stroke-width="2"/>
      <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">R</text>
    </svg>
  `)}`

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Try to load the PNG image first */}
      {!imageError && (
        <img
          src="/logol.png"
          alt="Rehbar AI"
          className={`${sizeClasses[size]} object-contain ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => {
            setImageLoaded(true)
            setImageError(false)
          }}
          onError={() => {
            // Try SVG fallback before showing text
            setImageError(true)
            setImageLoaded(false)
          }}
        />
      )}

      {/* SVG fallback if PNG fails */}
      {imageError && !imageLoaded && (
        <img
          src={svgLogo}
          alt="Rehbar AI"
          className={`${sizeClasses[size]} object-contain`}
        />
      )}

      {/* Always show text alongside logo */}
      <div className={`font-bold text-white ${textSizeClasses[size]}`}>
        Rehbar AI
      </div>
    </div>
  )
}

export default Logo
