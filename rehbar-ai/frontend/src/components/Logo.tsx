import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`font-bold text-white ${textSizeClasses[size]}`}>
        Rehbar AI
      </div>
    </div>
  )
}

export default Logo
