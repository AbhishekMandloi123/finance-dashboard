import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role, setRole] = useState('user')

  const toggleRole = () => {
    setRole(prev => prev === 'admin' ? 'user' : 'admin')
  }

  const isAdmin = role === 'admin'

  return (
    <AuthContext.Provider value={{ role, isAdmin, toggleRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
