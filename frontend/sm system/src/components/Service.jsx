import React, { useEffect, useState } from 'react';
import { listService, createService } from '../services/Api'; // Import the listService and createService functions

function Service() {
  const [services, setServices] = useState([]); // State to hold the services data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newService, setNewService] = useState({ serviceType: '', description: '' }); // State for new service data

  useEffect(() => {
    const fetchServices = async () => {
      const data = await listService(); // Call the listService function
      setServices(data.data); // Update the state with the fetched services
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value }); // Update new service data
  };

  const handleAddService = async () => {
    // Call the createService API function to add the new service
    await createService(newService);
    setIsModalOpen(false); // Close the modal after adding
    setNewService({ serviceType: '', description: '' }); // Reset the new service data
    const data = await listService(); // Refresh the service list
    setServices(data.data); // Update the state with the new list of services
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Service
      </button>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <li key={service._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold">{service.serviceType}</h2>
            <p className="text-gray-600">{service.description}</p>
          </li> // Display each service
        ))}
      </ul>

      {/* Modal for adding a new service */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
            <input 
              type="text" 
              name="serviceType"
              placeholder="Service Type"
              value={newService.serviceType}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <textarea 
              name="description" 
              placeholder="Service Description" 
              value={newService.description} 
              onChange={handleInputChange} 
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button 
                onClick={handleAddService} 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
              >
                Add
              </button>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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

export default Service;