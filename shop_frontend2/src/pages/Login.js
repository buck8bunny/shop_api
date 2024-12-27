import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Starting login process...');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      console.log('Sending POST request to /api/v1/login...');
      const response = await axios.post(
        'http://localhost:3000/api/v1/login', // Укажите полный путь до API
        {
          user: {
            email,
            password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response received:', response);

      // В Devise, токен может отсутствовать, используйте текущего пользователя
      const { user } = response.data;
      if (!user) {
        console.error('User not found in response.');
        throw new Error('User not found in response.');
      }

      console.log('User authenticated:', user);

      // Сохраняем ID пользователя в localStorage
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User data saved to localStorage.');

      // Переход на главную страницу
      console.log('Navigating to the homepage...');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed! Please check your email and password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
