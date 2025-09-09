import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  //   show a spinner, if the auth state loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        Loading...
      </div>
    );
  }

  // no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;
