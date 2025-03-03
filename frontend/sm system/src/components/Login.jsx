import React, { useState } from 'react';
import { loginUser } from '../services/Api'; // Import the loginUser function
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    const response = await loginUser(credentials); // Call the loginUser function
    console.log("Full response:", response); // Log the entire response for debugging
    if (response.token) {
      localStorage.setItem('token', response.token); // Save the token
      console.log("User role:", response.user.role); // Access the user role correctly
      if (response.user.role === 'Admin') { // Check if the role is admin
        console.log("Redirecting to Admin Panel"); // Debugging: Log redirection
        navigate('/admin-panel'); // Redirect to AdminPanel if role is admin
      } else {
        navigate('/'); // Redirect to home or desired route after login
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
        className="border rounded p-2 w-full mb-4" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
        className="border rounded p-2 w-full mb-4" 
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
    </form>
  );
}

export default Login;