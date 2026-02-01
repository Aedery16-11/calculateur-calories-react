import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TotalCalory from './components/TotalCalory'  // ✅ Bon chemin
import ListCalory from './components/ListCalory'
import { CaloriesProvider } from './contexts/CaloryContext'
import './App.css'

function App() {
  return (
    <CaloriesProvider>
    <TotalCalory />   
    </CaloriesProvider>
  )
}

export default App