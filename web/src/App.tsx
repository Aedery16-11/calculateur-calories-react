import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TotalCalory from './components/TotalCalory'  // ✅ Bon chemin
import ListCalory from './components/ListCalory'
import CaloryForm from './components/CaloryForm'
import { CaloriesProvider } from './contexts/CaloryContext'
import './App.css'

function App() {
  return (
    <CaloriesProvider>
      <h1>Compteur</h1>
      <br />
      <TotalCalory />
      <hr />
      <br />
      <CaloryForm />
      <hr />
      <br />
      <ListCalory />

    </CaloriesProvider>
  )
}

export default App