const BASE_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const toggleUserStatus = async (userId, confirm) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/users/${userId}/toggle-status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ confirm }),
    });
    return response.json();
};

export const createService = async (serviceData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/services`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
    });
    return response.json();
};
export const listService = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/services`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        
    });
    return response.json();
};
