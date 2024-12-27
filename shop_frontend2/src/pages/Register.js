import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        user: { 
          first_name: firstName, 
          last_name: lastName, 
          email, 
          password 
        }
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
        if (error.response && error.response.data.errors) {
          alert(error.response.data.errors.join(', '));
        } else {
          alert('Registration failed!');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;