"use client";

import { useState } from "react";
import axios from "axios";

export default function refreshPage() {
  const handleRefreshToken = async () => {
    try {
      const response = await axios.post("/api/refresh");
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Refresh Page</h1>
      <button onClick={handleRefreshToken}>Refresh Token</button>
    </div>
  );
}
