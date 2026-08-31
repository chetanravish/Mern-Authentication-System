import { Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import ProtectedRoute from './pages/ProtectedRoute'
const App = () => {
  return (
    <div>
      <Routes>
     <Route path="/" element={<HomePage/>} />

       <Route
      path="/dashboard"
      element={
      <ProtectedRoute>
      <Dashboard />
      </ProtectedRoute>
  }
/>
</Routes>
      
    </div>
  )
}

export default App
