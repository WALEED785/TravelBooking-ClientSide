import React, { useState } from 'react';
import { useAuth } from '../../src/hooks/useAuth';
import '../style/LoginRegister.css'; 
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const LoginRegister = () => {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isLogin: true,
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing...');

    if (formData.isLogin) {
      // LOGIN
      const { username, email, password } = formData;
      const credentials = {
        username: username || email,
        password,
      };

      const res = await login(credentials);

      if (res.success) {
        const data = res.data; // This should be your LoginResponseDTO

        // Store in localStorage directly
        localStorage.setItem('user', JSON.stringify({
          userId: data.userId,
          username: data.username,
          role: data.role,
          token: data.token,
          expiry: data.expiry,
        }));

        setStatus('Login successful!');
        toast.success('Login successful!');
      } else {
        setStatus(res.error || 'Login failed');
        toast.error('Login failed!');
      }
    } else {
      // REGISTER
      const { username, email, password } = formData;
      const res = await register({ username, email, password });

      if (res.success) {
        setStatus('Registration successful!');
        toast.success('Registration successful! Please log in.');
      } else {
        setStatus(res.error || 'Registration failed');
        toast.error('Registration failed!');
      }
    }
  };

  return (
    <>
    <Navbar />
    <div className="auth-container">
      <h2>{formData.isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!formData.isLogin && (
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          />

        <button type="submit">
          {formData.isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p>{status}</p>

      <button
        onClick={() =>
            setFormData((prev) => ({
                ...prev,
                isLogin: !prev.isLogin,
                username: '',
                email: '',
                password: '',
            }))
        }
        >
        {formData.isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
          </>
  );
};

export default LoginRegister;
