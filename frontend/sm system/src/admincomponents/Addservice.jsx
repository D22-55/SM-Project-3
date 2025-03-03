import React, { useEffect, useState } from 'react';
import { listService, createService } from '../services/Api';

function Addservice() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ serviceType: '', description: '' });

  useEffect(() => {
    const fetchServices = async () => {
      const data = await listService();
      setServices(data.data);
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleAddService = async () => {
    await createService(newService);
    setIsModalOpen(false);
    setNewService({ serviceType: '', description: '' });
    const data = await listService();
    setServices(data.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Service</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Service
      </button>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <li key={service._id} className="border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <h3 className="font-semibold text-lg">{service.serviceType}</h3>
            <p className="text-gray-600">{service.description}</p>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
            <input 
              type="text" 
              name="serviceType"
              placeholder="Service Type"
              value={newService.serviceType}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <textarea 
              name="description" 
              placeholder="Service Description" 
              value={newService.description} 
              onChange={handleInputChange} 
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <div className="flex justify-end">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
                onClick={handleAddService}
              >
                Add
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addservice;