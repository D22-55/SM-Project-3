import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4 text-white">
          <li className="hover:text-gray-400"><Link to="/">Home</Link></li>
          <li className="hover:text-gray-400"><Link to="/about">About Us</Link></li>
          <li className="hover:text-gray-400"><Link to="/services">Services</Link></li>
          <li className="hover:text-gray-400"><Link to="/contact">Contact Us</Link></li>
          <li className="hover:text-gray-400"><Link to="/login">Login</Link></li>
          <li className="hover:text-gray-400"><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    )
  }
  
  export default Navbar;