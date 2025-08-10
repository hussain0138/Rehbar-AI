import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function Extension() {
  // Redirect to desktop page since we no longer support extensions
  return <Navigate to="/desktop" replace />
}
