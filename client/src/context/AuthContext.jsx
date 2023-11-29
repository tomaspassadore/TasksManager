import { createContext, useState, useContext, useEffect } from 'react'
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
  updateProfileRequest,
  deleteProfileRequest
} from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be using within an authProvider')
  return context
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (localStorage.theme === 'light') return 'light'
    else return 'dark'
  })

  // Dark mode
  const toggleMode = () => {
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }
  useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (theme === 'dark') htmlElement.classList.add('dark')
    else htmlElement.classList.remove('dark')
  }, [theme])
  // ---------------------------------------

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin () {
      const token = Cookies.get('token')
      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }

      try {
        const res = await verifyTokenRequest(token)
        if (!res.data) {
          setIsAuthenticated(false)
          Cookies.remove('token')
          setLoading(false)
          return
        }
        setUser(res.data)
        setIsAuthenticated(true)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setUser(null)
        setIsAuthenticated(false)
        setLoading(false)
        Cookies.remove('token')
      }
    }
    checkLogin()
  }, [])

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
      Cookies.set('token', res.data.token, {
        expires: 1,
        secure: true,
        sameSite: 'none'
      })
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
      Cookies.set('token', res.data.token, {
        expires: 1,
        secure: true,
        sameSite: 'none'
      })
    } catch (error) {
      setErrors([error.response.data.message])
    }
  }

  const logout = async () => {
    try {
      await logoutRequest()
      setIsAuthenticated(false)
      setUser(null)
      Cookies.remove('token')
    } catch (error) {
      console.log(error)
    }
  }

  const updateProfile = async (id, field, data) => {
    try {
      const newProfile = await updateProfileRequest(id, field, data)
      if (newProfile) return newProfile
    } catch (error) {
      throw new Error()
    }
  }

  const deleteProfile = async (id) => {
    try {
      await deleteProfileRequest(id)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        theme,
        setTheme,
        toggleMode,
        signUp,
        signIn,
        updateProfile,
        deleteProfile,
        logout,
        user,
        isAuthenticated,
        errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
