import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Import Routes
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Service from './components/Service' 
import Contact from './components/Contact'
import About from './components/About'
import AdminPanel from './admincomponents/AdminPanel'
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
        <div style={{ flex: 1, marginTop: '60px' }}> {/* Adjust marginTop based on Navbar height */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
        </div>
        <Footer style={{ marginTop: 'auto' }} />
      </div>
    </Router>
  )
}

export default App