// src/App.jsx
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Agence from './pages/Agence'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'
import LoadingSpinner from './components/common/LoadingSpinner'
import { SimulationProvider } from './context/SimulationContext'

const App = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const hideChrome = location.pathname === '/login' || location.pathname === '/dashboard'

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      try {
        const authEmail = localStorage.getItem('ir_auth_email')
        const userData = localStorage.getItem('ir_user_data')
        
        if (authEmail && userData) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          // Clear any invalid auth data
          localStorage.removeItem('ir_auth_email')
          localStorage.removeItem('ir_user_data')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50">
          <LoadingSpinner message="Checking authentication..." />
        </div>
      )
    }
    
    return isAuthenticated ? children : <Navigate to="/login" replace />
  }

  // Public Route Component (redirect if already authenticated)
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50">
          <LoadingSpinner message="Loading..." />
        </div>
      )
    }
    
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
  }

  return (
    <SimulationProvider>
      <div className='overflow-x-hidden'>
        {!hideChrome && <Navbar />}
        {!hideChrome && <FullScreenNav />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agence' element={<Agence />} />
          <Route path='/projects' element={<Projects />} />
          <Route 
            path='/login' 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SimulationProvider>
  )
}

export default App
