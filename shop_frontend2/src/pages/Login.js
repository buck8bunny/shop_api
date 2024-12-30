import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Устанавливаем интерсептор для добавления токенов в запросы
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        console.log('Interceptor triggered. Config before modification:', config);

        const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));
        if (authHeaders) {
          console.log('Auth headers found in localStorage:', authHeaders);
          config.headers['access-token'] = authHeaders['access-token'];
          config.headers['client'] = authHeaders['client'];
          config.headers['uid'] = authHeaders['uid'];
        }

        console.log('Config after modification by interceptor:', config);
        return config;
      },
      (error) => {
        console.error('Interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with email:', email, 'and password:', password);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/sign_in',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response received from API:', response);

      // Извлечение токенов из заголовков
      const authHeaders = {
        'access-token': response.headers['access-token'],
        client: response.headers['client'],
        uid: response.headers['uid'],
      };

      console.log('Authentication headers extracted:', authHeaders);

      // Сохранение токенов в localStorage
      localStorage.setItem('authHeaders', JSON.stringify(authHeaders));

      // Сохранение данных пользователя
      const userData = response.data.data;
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('User authenticated and saved to localStorage:', userData);

      // Переход на главную страницу
      navigate('/');
    } catch (error) {
      console.error('Login failed. Error details:', error.response?.data || error.message);
      alert('Login failed! Please check your email and password.');
    }
  };

  // Проверка авторизации при загрузке компонента
  useEffect(() => {
    console.log('Checking for existing authentication...');

    const authHeaders = JSON.parse(localStorage.getItem('authHeaders'));
    const user = JSON.parse(localStorage.getItem('user'));

    if (authHeaders && user) {
      console.log('User is already authenticated:', user);
      // Здесь можно перенаправить авторизованного пользователя, если требуется
      // navigate('/');
    } else {
      console.log('User is not authenticated');
    }
  }, [navigate]);

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
