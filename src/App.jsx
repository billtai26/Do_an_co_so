import Board from '~/pages/Boards/_id.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserProfile from '~/components/UserProfile'
import TaskManager from '~/components/TaskManager'
import CommentsSection from '~/components/CommentsSection'
import BoardList from '~/pages/Boards/BoardList'
import NewBoard from '~/pages/Boards/NewBoard'
import Dashboard from '~/pages/Dashboard/Dashboard'
import Login from '~/pages/Auth/Login'
import Register from '~/pages/Auth/Register'
import { useState, useEffect } from 'react'

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated') === 'true'
      setIsAuthenticated(auth)
    }
    
    checkAuth()
    window.addEventListener('storage', checkAuth)
    
    return () => {
      window.removeEventListener('storage', checkAuth)
    }
  }, [])

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><BoardList /></ProtectedRoute>} />
        <Route path="/boards" element={<ProtectedRoute><BoardList /></ProtectedRoute>} />
        <Route path="/board/new" element={<ProtectedRoute><NewBoard /></ProtectedRoute>} />
        <Route path="/board/:id" element={<ProtectedRoute><Board /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/task-manager" element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
        <Route path="/comments" element={<ProtectedRoute><CommentsSection /></ProtectedRoute>} />
        
        {/* Redirect any unknown routes to the board list page if authenticated, or login if not */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/boards" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
