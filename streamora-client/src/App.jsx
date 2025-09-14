import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// pages
import LoginPage from "./Pages/LoginPage";

// components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navigation/Navbar";

// dev utility route for Socket.IO testing — keep out of prod nav
import SocketTesting from "./Testing/SOCKET.IO";

// ultra-minimal protected page to validate the flow end-to-end
const Dashboard = () => (
  <div className="min-h-screen bg-neutral-900 text-white p-6">
    <h1 className="text-3xl font-bold">Dashboard</h1>
    <p className="mt-2 text-gray-300">
      Protected content visible only when logged in.
    </p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* dev-only route */}
        <Route path="/socket-test" element={<SocketTesting />} />
        {/* not found fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
