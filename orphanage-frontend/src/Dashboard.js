import React, { useState, useEffect } from 'react';
import { getAvailableChildren, requestAdoption, getUserAdoptions, cancelAdoptionRequest } from './api';

const Dashboard = () => {
  // --- Toggles between 'form' and 'history' tabs ---
  const [activeTab, setActiveTab] = useState('form'); 
  const userId = "650c1f1e1c9d440000a1b2c4"; // Dummy ID for testing

  // --- Form State (Experiment 8 & 9) ---
  const [form, setForm] = useState({ childId: '', occupation: '', annualIncome: '', reason: '' });
  const [children, setChildren] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // --- History State (Experiment 12) ---
  const [adoptions, setAdoptions] = useState([]);

  // Load Data
  useEffect(() => {
    // Always load available children for the form
    getAvailableChildren().then(res => setChildren(res.children || []));
    
    // Load history only when the History tab is active
    if (activeTab === 'history') {
      getUserAdoptions(userId).then(res => setAdoptions(res.adoptions || []));
    }
  }, [activeTab]);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    
    // Validation
    if (!form.childId || Number(form.annualIncome) < 150000) {
      return setError("Please select a child and ensure income is at least ₹1,50,000.");
    }

    const res = await requestAdoption("dummy_token", { ...form, adopterId: userId });
    if (res.message && res.message.includes('successfully')) {
      setMessage("Request submitted! Check your History tab.");
      setForm({ childId: '', occupation: '', annualIncome: '', reason: '' });
    } else {
      setError("Failed to submit request.");
    }
  };

  // Handle Cancel
  const handleCancel = async (id) => {
    if (window.confirm("Cancel this request?")) {
      await cancelAdoptionRequest(id);
      const updated = await getUserAdoptions(userId);
      setAdoptions(updated.adoptions || []);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      
      {/* TABS NAVIGATION */}
      <div style={{ display: 'flex', borderBottom: '2px solid #ddd', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('form')}
          style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'form' ? '#007BFF' : '#f4f4f4', color: activeTab === 'form' ? 'white' : 'black', border: 'none', fontWeight: 'bold' }}
        >
          Submit Request
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          style={{ padding: '10px 20px', cursor: 'pointer', background: activeTab === 'history' ? '#007BFF' : '#f4f4f4', color: activeTab === 'history' ? 'white' : 'black', border: 'none', fontWeight: 'bold' }}
        >
          My History
        </button>
      </div>

      {/* TAB 1: THE FORM */}
      {activeTab === 'form' && (
        <div>
          <h2>Submit Adoption Request</h2>
          {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
          {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <select value={form.childId} onChange={(e) => setForm({...form, childId: e.target.value})} style={{ padding: '8px' }}>
              <option value="">-- Select a Child --</option>
              {children.map(c => <option key={c._id} value={c._id}>{c.name} (Age {c.age})</option>)}
            </select>
            <input type="text" placeholder="Your Occupation" value={form.occupation} onChange={(e) => setForm({...form, occupation: e.target.value})} style={{ padding: '8px' }} />
            <input type="number" placeholder="Annual Income (₹)" value={form.annualIncome} onChange={(e) => setForm({...form, annualIncome: e.target.value})} style={{ padding: '8px' }} />
            <textarea placeholder="Reason for adoption..." value={form.reason} onChange={(e) => setForm({...form, reason: e.target.value})} style={{ padding: '8px', height: '80px' }} />
            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', fontWeight: 'bold' }}>Submit Request</button>
          </form>
        </div>
      )}

      {/* TAB 2: THE HISTORY */}
      {activeTab === 'history' && (
        <div>
          <h2>My Adoption History</h2>
          {adoptions.length === 0 ? <p>You haven't submitted any adoption requests yet.</p> : 
            adoptions.map(app => (
              <div key={app._id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                <p><strong>Child:</strong> {app.child?.name}</p>
                <p><strong>Status:</strong> {app.status.toUpperCase()}</p>
                {app.status === 'pending' && (
                  <button onClick={() => handleCancel(app._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Cancel Request</button>
                )}
              </div>
            ))
          }
        </div>
      )}

    </div>
  );
};

export default Dashboard;