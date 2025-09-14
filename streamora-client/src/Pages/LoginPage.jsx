import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // the little login box — supports sign in and sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'

  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // submit handler — decides between sign in or sign up based on mode
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "signup") {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate("/dashboard"); // redirect to the protected dashboard
    } catch (err) {
      setError(
        mode === "signup"
          ? "Failed to create account. Try a stronger password or a different email."
          : "Failed to sign in. Please check your credentials."
      );
      console.error(err);
    }
  };

  // google login for the fast path — fewer forms, more flow
  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-6 md:px-8 lg:px-12">
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl p-8 md:p-10 space-y-6 bg-neutral-800/70 backdrop-blur rounded-2xl shadow-xl border border-neutral-700">
        {/* header — simple and friendly */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            {mode === "signup"
              ? "It takes 10 seconds."
              : "Glad to see you again."}
          </p>
        </div>

        {error && (
          <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 mt-1 text-white bg-neutral-700/80 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === "signup" ? "Minimum 6 characters" : "Your password"
              }
              className="w-full px-3 py-2 mt-1 text-white bg-neutral-700/80 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 font-semibold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            {mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        {/* the small divider */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-neutral-700 flex-1" />
          <span className="text-neutral-400 text-xs">or</span>
          <div className="h-px bg-neutral-700 flex-1" />
        </div>

        {/* google login — one click, no hassle */}
        <button
          onClick={handleGoogle}
          className="w-full py-2 px-4 font-semibold text-neutral-900 bg-white rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300"
        >
          Continue with Google
        </button>

        {/* tiny link to flip between sign in / sign up */}
        <p className="text-center text-sm text-neutral-400">
          {mode === "signup" ? "Already have an account?" : "New here?  "}{" "}
          <button
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="ml-4 text-cyan-400 hover:text-cyan-300 font-medium"
          >
            {mode === "signup" ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
