import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Header'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />
      </div>
    </ BrowserRouter>
  )
}

export default App
