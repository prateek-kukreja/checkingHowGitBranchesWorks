// context/AuthContext.js
'use client'

import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check if token exists in cookies on initial load
    const savedToken = Cookies.get('jwt')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const loginSaveCookie = (jwt) => {
    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + '8h') // Set expiry 8 hours from now

    Cookies.set('jwt', token, { expires: expiresDate })

    // Cookies.set("jwt", jwt, { expires: 7 }); // Expires in 7 days
    setToken(jwt)
  }

  const logout = () => {
    Cookies.remove('jwt')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, loginSaveCookie, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
