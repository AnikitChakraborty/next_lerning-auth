"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found");
        return;
      }

      try {
        const response = await axios.get("/api/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Token is valid");
      } catch (error: any) {
        setMessage("Invalid token: " + error.response.data.message);
      }
    };

    validateToken();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
