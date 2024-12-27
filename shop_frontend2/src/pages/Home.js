import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../components/ItemList';

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
    localStorage.removeItem('user');
    setUser(null); // Сбрасываем состояние пользователя
  };
  
  return (
    <div>
      <h1>Welcome to the Shop</h1>
      {!user ? (
        // Если пользователь не авторизован
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        // Если пользователь авторизован
        <div>
          <h2>Hello, {user.first_name}!</h2>
          <p>Enjoy browsing our shop!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {/* <ItemList /> */}
    </div>
  );
};

export default Home;
