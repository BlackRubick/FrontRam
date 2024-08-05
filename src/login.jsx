import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Para mostrar mensajes de éxito
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Enviar solicitud de inicio de sesión a la API
      const response = await axios.post('http://52.87.99.94:8000/login/', { email, password });

      // Si el inicio de sesión es exitoso, redirigir al usuario y mostrar el mensaje de éxito
      if (response.status === 200) {
        setSuccess(response.data.message);
        setError(null); // Limpiar cualquier error previo
        navigate('/registro');
      }
    } catch (err) {
      console.error('Error during login:', err.response?.data || err.message);
      setSuccess(null); // Limpiar cualquier mensaje de éxito previo
      setError(err.response?.data?.detail || 'Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {success && <p className="login-success">{success}</p>} {/* Mostrar mensajes de éxito */}
          {error && <p className="login-error">{error}</p>} {/* Mostrar errores */}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
