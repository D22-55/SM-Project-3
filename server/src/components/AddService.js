import React, { useState } from "react";
import axios from "axios";

const AddService = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    serviceType: ""
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("/api/admin/services", service, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service added successfully!");
      setService({ name: "", description: "", price: "", serviceType: "" });
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. " + (error.response ? error.response.data.message : ""));
    }
  };

  return (
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Service Name" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="serviceType" placeholder="Service Type" onChange={handleChange} required />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService; 