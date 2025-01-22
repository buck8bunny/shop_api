import React, { useState, useEffect } from 'react';
import { HashRouter  as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminUsersTable from './components/AdminUsersTable';
import ItemList from './components/ItemList';
import UserOrders from './components/UserOrders';
import Header from './components/Header';

const App = () => {
  const [user, setUser] = useState(null);

  // Проверка состояния авторизации
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      {/* Передаем состояние авторизации и метод выхода в Header */}
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <AdminUsersTable /> : <Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/users" element={user ? <AdminUsersTable /> : <Login />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/orders" element={user ? <UserOrders /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
