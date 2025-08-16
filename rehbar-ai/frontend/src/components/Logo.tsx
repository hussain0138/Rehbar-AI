// Logo.tsx
import React from 'react'
import logoImage from '../components/logol.png'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'h-8',     // small
    md: 'h-12',    // medium
    lg: 'h-16',    // large
    xl: 'h-20'     // extra large
  }

  // If className has an h-* utility, skip sizeMap
  const hasCustomHeight = /\bh-\d+/.test(className)

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="Rehbar AI"
        className={`${hasCustomHeight ? '' : sizeMap[size]} w-auto`}
      />
    </div>
  )
}

export default Logo
