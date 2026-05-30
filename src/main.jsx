import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AppointmentScheduler from './components/AppointmentScheduler.jsx'
import PreQualification from './components/PreQualification.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/schedule" element={<AppointmentScheduler />} />
        <Route path="/prequal" element={<PreQualification />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
