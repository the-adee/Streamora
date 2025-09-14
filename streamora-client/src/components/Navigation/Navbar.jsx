import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

const Navbar = () => {
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      // re-direct to login after sign out
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in failed", error);
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
              <span className="text-gray-300 flex items-center gap-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 font-semibold text-white bg-neutral-700 rounded-md hover:bg-neutral-600"
              >
                Email Login
              </Link>
              <button
                onClick={handleGoogleSignIn}
                className="px-4 py-2 font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
              >
                Login with Google
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
