import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Welcome, {user.name} to this website!</p>
      <p>Email: {user.email}</p>
      <p>Account created: {new Date(user.createdAt).toLocaleString()}</p>
      <p>This is present in Dashboard.jsx</p>
    </div>
  );
}
