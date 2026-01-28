import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TotalCalory from './components/TotalCalory'  // ✅ Bon chemin
import ListCalory from './components/ListCalory'
import './App.css'

function App() {
  return (
    <TotalCalory />   // ✅ Affiche maintenant le vrai TotalCalory
  )
}

export default App