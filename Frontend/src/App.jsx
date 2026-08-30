import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/verify-email' element={<VerifyEmail />}/>
        <Route path='/dashboard' element={<Dashboard />}/>

      </Routes>
      
    </div>
  )
}

export default App
