import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: userName,
        password: password,
      });
  
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('token', token); // Store the token in a cookie
        alert("Logged in successfully!");
        window.location.href = '/';
      } 
    } catch (error) {
      alert('Username or Password is incorrect.');
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Username: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <br />

        <label className="form-label">
          Password <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          required
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <p className="login-text">
          Don't have an account?{' '}
          <a className="signup-atag" href="/signup">
            Sign up
          </a>
        </p>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;