import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get("/api/admin/reports", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setServices(response.data);
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {services.map((service) => (
          <li key={service._id}>{service.name} - {service.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports; 