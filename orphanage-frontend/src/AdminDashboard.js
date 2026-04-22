import React, { useState, useEffect } from 'react';
import { getPendingRequests, updateAdoptionStatus } from './api';

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [reasons, setReasons] = useState({});

    // This loads the requests as soon as you open the page
    const loadRequests = async () => {
        const data = await getPendingRequests();
        setRequests(data.requests || []);
    };

    useEffect(() => { loadRequests(); }, []);

    // This runs when you click Approve or Reject
    const handleAction = async (id, status) => {
        const reason = reasons[id] || "No specific reason provided.";
        const res = await updateAdoptionStatus(id, status, reason);
        
        if (res.message) {
            alert("Action successful: " + status.toUpperCase());
            loadRequests(); // Refresh the list so the card disappears!
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Admin: Manage Adoption Requests</h2>
            
            {requests.length === 0 ? <p>No pending requests.</p> : 
                requests.map(req => (
                    <div key={req._id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
                        <p><strong>Adopter ID:</strong> {req.adopter}</p>
                        <p><strong>Child ID:</strong> {req.child}</p>
                        
                        <textarea 
                            placeholder="Type a reason here before clicking Reject..."
                            style={{ width: '100%', marginBottom: '10px', height: '60px', padding: '5px' }}
                            onChange={(e) => setReasons({...reasons, [req._id]: e.target.value})}
                        />
                        
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleAction(req._id, 'approved')} style={{ background: 'green', color: 'white', padding: '8px 15px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Approve</button>
                            <button onClick={() => handleAction(req._id, 'rejected')} style={{ background: 'red', color: 'white', padding: '8px 15px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Reject</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default AdminDashboard;