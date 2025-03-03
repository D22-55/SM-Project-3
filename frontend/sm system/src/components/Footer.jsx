import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Stay Connected</h2>
        </div>
        <div className="flex space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            Instagram
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/services" className="hover:text-gray-400">Services</a>
          <a href="/contact" className="hover:text-gray-400">Contact Us</a>
        </div>
        <div className="mt-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;