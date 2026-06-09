import React, { createContext, useContext, useState, useCallback } from 'react'
import type { User } from '../types'
import { sampleUsers } from '../data/sampleData'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    const foundUser = sampleUsers.find(u => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }, [])

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800))

    const newUser: User = {
      id: `user${Date.now()}`,
      email,
      displayName: name,
      phone: '',
      addresses: [],
      wishlist: [],
      orders: [],
      isAdmin: false,
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateProfile = useCallback((data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data })
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
