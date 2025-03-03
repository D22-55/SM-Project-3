import React, { useEffect, useState } from "react";
import axios from "axios";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services"); // Adjust this endpoint as needed
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Available Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Type: {service.serviceType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList; 