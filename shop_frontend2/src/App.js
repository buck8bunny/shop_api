import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;