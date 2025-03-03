import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div 
        className="relative w-full h-64 bg-cover bg-center" 
        style={{ backgroundImage: "url('path/to/your/banner-image.jpg')" }} // Replace with your image path
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white text-center p-8">
          <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
          <p className="text-lg mt-2">Your journey starts here!</p>
          <p className="text-md mt-2">Join us to explore amazing services tailored for you.</p>
          <Link to="/contact" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">Contact Us</Link>
        </div>
      </div>
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-semibold">Explore Our Services</h2>
        <div className="mt-4 flex justify-center space-x-4">
          <div className="bg-green-500 text-white py-4 px-6 rounded shadow-md">Plumbing</div>
          <div className="bg-green-500 text-white py-4 px-6 rounded shadow-md">Repairing</div>
          <div className="bg-green-500 text-white py-4 px-6 rounded shadow-md">Washing</div>
        </div>
        {/* Add more content or sections as needed */}
      </div>
    </div>
  );
}

export default Home;