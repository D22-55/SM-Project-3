import React, { useState } from 'react';
import { registerUser } from '../services/Api'; // Import the registerUser function
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' // Default role removed, now taken from input
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the registerUser API function
    try {
      const response = await registerUser(formData);
      console.log('User registered successfully:', response);
      
      // Save the token to local storage
      localStorage.setItem('token', response.token); // Save the token
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email ID:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required className="border rounded p-2 w-full">
          <option value="">Select Role</option>
          <option value="Service Provider">Service Provider</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
    </form>
  );
}

export default Register;