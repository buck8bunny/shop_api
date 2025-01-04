import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
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
        `${API_URL}/api/v1/auth/sign_in`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Добавьте, если сервер требует
        }
      );
      
      
  
      console.log('Response received from API:', response);
      console.log('All response headers:', response.headers);

  
      // Извлечение токенов из заголовков
      const authHeaders = {
        'access-token': response.headers['access-token'] || response.headers['Access-Token'],
        client: response.headers['client'] || response.headers['Client'],
        uid: response.headers['uid'] || response.headers['Uid'],
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
      // Обновление страницы после авторизации
      window.location.reload();
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
