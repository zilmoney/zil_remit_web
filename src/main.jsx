import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import About from './pages/About.jsx'
import PressRelease from './pages/PressRelease.jsx'
import SendMoneyEstonia from './pages/SendMoneyEstonia.jsx'
import SendMoneySweden from './pages/SendMoneySweden.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/press-release" element={<PressRelease />} />
        <Route path="/send-money-estonia" element={<SendMoneyEstonia />} />
        <Route path="/send-money-sweden" element={<SendMoneySweden />} />
      </Routes>
    </Router>
  </StrictMode>,
)

