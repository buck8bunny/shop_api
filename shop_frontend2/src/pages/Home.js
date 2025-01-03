import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [user, setUser] = useState(null); // Хранит данные о текущем пользователе
  const navigate = useNavigate();

  // Имитация проверки авторизации (например, из локального хранилища или API)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Получение данных из локального хранилища
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login'); // Переход на страницу логина
  };

  const handleRegister = () => {
    navigate('/register'); // Переход на страницу регистрации
  };

  
  const handleLogout = () => {
    // Удаляем данные пользователя и токены из localStorage
    localStorage.removeItem('authHeaders');
    localStorage.removeItem('user');
  
    console.log('User logged out. LocalStorage cleared.');
  
    // Обновляем страницу
    window.location.reload();
  };
  
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to the Shop</h1>
      {!user ? (
        // Если пользователь не авторизован
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          <button className="btn btn-secondary" onClick={handleRegister}>Register</button>
        </div>
      ) : (
        // Если пользователь авторизован
        <div>
          <h2>Hello, <span className="text-primary">{user.first_name}</span>!</h2>
          <p className="lead">Enjoy browsing our shop!</p>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
      )}
      {/* <ItemList /> */}
    </div>
  );
};

export default Home;
