import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage'
import { makeStyles, styled } from '@mui/material'

function App() {

  const AppContainer = styled('div')(({ theme }) => ({
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  }));

  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
      </AppContainer>
    </ BrowserRouter>
  )
}

export default App
