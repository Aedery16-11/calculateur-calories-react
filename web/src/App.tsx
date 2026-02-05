import TotalCalory from './components/TotalCalory'  // ✅ Bon chemin
import ListCalory from './components/ListCalory'
import CaloryForm from './components/CaloryForm'
import { CaloriesProvider } from './contexts/CaloryContext'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';

function App() {
  return (
    <AuthProvider>
      <CaloriesProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/' element={
              <ProtectedRoute>
                <TotalCalory /> 
                <ListCalory />
              </ProtectedRoute>
            } />
            <Route path='/add' element={
              <ProtectedRoute>
                <CaloryForm />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </CaloriesProvider>
    </AuthProvider>
  )
}

export default App