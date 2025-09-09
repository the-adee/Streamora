import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login"); // Redirect to login after sign out
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <nav className="bg-neutral-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          Streamora
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
