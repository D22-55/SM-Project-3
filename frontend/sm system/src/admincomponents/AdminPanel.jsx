import React, { useState } from 'react';
import Addservice from './Addservice';

function AdminPanel() {
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  return (
    <div className="flex flex-col items-center p-4">
      <button 
        onClick={() => setIsAddServiceOpen(true)} 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Services
      </button>
      
      {isAddServiceOpen && (
        <div className="mt-4">
          <Addservice />
        </div>
      )}
    </div>
  );
}

export default AdminPanel;