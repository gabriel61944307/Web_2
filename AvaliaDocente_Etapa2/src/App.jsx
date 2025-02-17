import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Layout from './pages/Layout';
import Home from './pages/Home'
import Avaliacoes from './pages/Avaliacoes';
import Avaliar from './pages/Avaliar';

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="avaliacoes" element={<Avaliacoes />} />
                    <Route path="avaliar" element={<Avaliar />} />
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

export default App
