import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard'; 
import AdminDashboard from './AdminDashboard'; 

function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: 'sans-serif' }}>
        
        {/* Universal Top Navigation Bar */}
        <nav style={{ padding: '15px 30px', background: '#333', display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>Home</Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>User Dashboard</Link>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#ffc107', fontWeight: 'bold' }}>Admin Panel</Link>
        </nav>

        {/* The Routes that switch the page content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;