import React, { useState } from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'h-14 w-auto',
    md: 'h-18 w-auto',
    lg: 'h-22 w-auto',
    xl: 'h-28 w-auto',
    xxl: 'h-32 w-auto'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    xxl: 'text-4xl'
  }

  // If image failed to load, show text logo
  if (imageError) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className={`font-bold text-white ${textSizeClasses[size]}`}>
          Rehbar AI
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image with multiple fallbacks */}
      <img
        src="/logol.png"
        alt="Rehbar AI"
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          // Try SVG fallback first
          if (target.src.includes('.png')) {
            target.src = '/logo.svg'
          } else {
            // If both fail, show text logo
            setImageError(true)
          }
        }}
        onLoad={() => setImageError(false)}
      />
    </div>
  )
}

export default Logo
