import React, { useContext } from "react";
//Navigate → a React Router component that redirects to another route (like /login).
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

//It receives children — the component/page you’re trying to render (for example, Dashboard, Profile, etc.).
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};
export default ProtectedRoute;
