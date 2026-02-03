import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TotalCalory from './components/TotalCalory'  // ✅ Bon chemin
import ListCalory from './components/ListCalory'
import CaloryForm from './components/CaloryForm'
import { CaloriesProvider } from './contexts/CaloryContext'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <CaloriesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><TotalCalory /> <ListCalory /></>} />
          <Route path='/add' element={<CaloryForm />} />
        </Routes>
      </BrowserRouter>
    </CaloriesProvider>
  )
}

export default App