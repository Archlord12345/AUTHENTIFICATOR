import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">Authentifictor</Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Service</Link>
              <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
