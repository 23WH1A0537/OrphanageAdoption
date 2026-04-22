const API_BASE_URL = 'http://localhost:5000/api';

// ==========================================
// EXPERIMENT 11: AUTHENTICATION
// ==========================================

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    return { message: 'Network error connecting to backend.' };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    return { message: 'Network error connecting to backend.' };
  }
};


// ==========================================
// EXPERIMENT 8 & 11: ADOPTION REQUESTS
// ==========================================

export const requestAdoption = async (token, adoptionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/adoptions/request`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Optional for your current lab setup
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adoptionData),
    });
    return await response.json();
  } catch (error) {
    return { message: 'Network error. Could not submit request.' };
  }
};


// ==========================================
// EXPERIMENT 10: FETCH CHILDREN
// ==========================================

export const getAvailableChildren = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/adoptions/children?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    return { message: 'Network error.' };
  }
};


// ==========================================
// EXPERIMENT 12: USER DASHBOARD
// ==========================================

export const getUserAdoptions = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/adoptions/user/${userId}`);
    return await response.json();
  } catch (error) {
    return { message: 'Network error.' };
  }
};

export const cancelAdoptionRequest = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/user/${id}`, { 
        method: 'DELETE' 
    });
    return await response.json();
  } catch (error) {
    return { message: 'Network error.' };
  }
};


// ==========================================
// EXPERIMENT 13: ADMIN DASHBOARD
// ==========================================

export const getPendingRequests = async () => {
  try {
    const adminId = "650c1f1e1c9d440000a1b2c4"; // Dummy admin ID for testing
    const response = await fetch(`${API_BASE_URL}/adoptions/admin/pending/${adminId}`);
    return await response.json();
  } catch (error) {
    return { message: 'Network error.' };
  }
};

export const updateAdoptionStatus = async (adoptionId, status, reason = "") => {
  try {
    const adminId = "650c1f1e1c9d440000a1b2c4"; // Dummy admin ID for testing
    const response = await fetch(`${API_BASE_URL}/adoptions/reject/${adoptionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, reason, status }) 
    });
    return await response.json();
  } catch (error) {
    return { message: 'Network error.' };
  }
};