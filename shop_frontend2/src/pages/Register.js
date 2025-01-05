import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  // Используем хук useState для управления состоянием полей ввода.
  const [firstName, setFirstName] = useState(''); // Состояние для имени.
  const [lastName, setLastName] = useState(''); // Состояние для фамилии.
  const [email, setEmail] = useState(''); // Состояние для email.
  const [password, setPassword] = useState(''); // Состояние для пароля.
  
  // Хук useNavigate для навигации между страницами.
  const navigate = useNavigate();

  // Функция обработки отправки формы регистрации.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы по умолчанию.
    try {
      // Вызов API для регистрации нового пользователя.
      await registerUser({
        user: {
          first_name: firstName, // Передаем имя.
          last_name: lastName, // Передаем фамилию.
          email, // Передаем email.
          password, // Передаем пароль.
        },
      });
      // Уведомляем пользователя об успешной регистрации.
      alert('Registration successful!');
      // Перенаправляем пользователя на страницу входа.
      navigate('/login');
    } catch (error) {
      // Обработка ошибок API.
      if (error.response && error.response.data.errors) {
        // Показываем пользователю список ошибок от сервера.
        alert(error.response.data.errors.join(', '));
      } else {
        // Общее сообщение об ошибке.
        alert('Registration failed!');
      }
    }
  };

  return (
    // Центрируем карточку регистрации на странице.
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        {/* Форма регистрации */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            {/* Поле ввода имени */}
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="Enter your first name"
              value={firstName} // Привязка к состоянию firstName.
              onChange={(e) => setFirstName(e.target.value)} // Обновление состояния при изменении значения.
              required // Обязательное поле.
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            {/* Поле ввода фамилии */}
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Enter your last name"
              value={lastName} // Привязка к состоянию lastName.
              onChange={(e) => setLastName(e.target.value)} // Обновление состояния.
              required // Обязательное поле.
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            {/* Поле ввода email */}
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email} // Привязка к состоянию email.
              onChange={(e) => setEmail(e.target.value)} // Обновление состояния.
              required // Обязательное поле.
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            {/* Поле ввода пароля */}
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password} // Привязка к состоянию password.
              onChange={(e) => setPassword(e.target.value)} // Обновление состояния.
              required // Обязательное поле.
            />
          </div>
          {/* Кнопка отправки формы */}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
