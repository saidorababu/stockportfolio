import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import StockDetail from './pages/StockDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16 min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}