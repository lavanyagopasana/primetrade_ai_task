import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ Auth pages — include Navbar and gradient background */}
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-blue-400 to-sky-300">
              <Navbar />
              <main className="flex-grow flex items-center justify-center px-4 py-0">
                <Login />
              </main>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-blue-400 to-sky-300">
              <Navbar />
              <main className="flex-grow flex items-center justify-center px-4 py-28">
                <Register />
              </main>
            </div>
          }
        />

        {/* ✅ Dashboard — no gradient, no flex centering, independent full screen */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
