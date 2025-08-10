import React from 'react'

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
 const sizeClasses = {
  sm: 'h-14 w-auto', // was 12
  md: 'h-18 w-auto', // was 16
  lg: 'h-22 w-auto', // was 20
  xl: 'h-28 w-auto', // was 24
  xxl: 'h-32 w-auto' // new super-sized option
};


  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <img
        src="/logol.png"
        alt="Rehbar AI Logo"
        className={`${sizeClasses[size]} object-contain`}
        onError={(e) => {
          // Fallback if logo doesn't exist yet
          const target = e.target as HTMLImageElement
          target.src = "/logo.svg" // fallback to our SVG
        }}
      />
    </div>
  )
}

export default Logo
