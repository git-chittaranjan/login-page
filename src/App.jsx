
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard name="Chittaranjan Saha" />} />

        {/* Protected routes */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
