// src/App.jsx
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Agence from './pages/Agence'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navigation/Navbar'
import FullScreenNav from './components/Navigation/FullScreenNav'

const App = () => {
  const location = useLocation()
  const hideChrome = location.pathname === '/login' || location.pathname === '/dashboard'
  const isAuthed = typeof window !== 'undefined' ? !!localStorage.getItem('ir_auth_email') : false
  return (
    <div className='overflow-x-hidden'>
      {!hideChrome && <Navbar />}
      {!hideChrome && <FullScreenNav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={isAuthed ? <Dashboard /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App