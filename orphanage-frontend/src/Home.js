import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>Orphanage Adoption Management System</h1>
      <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
        Helping children find loving homes. Manage your adoption requests easily.
      </p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit an Adoption Request
          </button>
        </Link>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;