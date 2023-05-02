import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post('https://50.122.223.254:8000/sign_in', {
        username,
        password
      });

      if (response.status === 200) {
        // Set the "profile_id" cookie and redirect to the main page
        console.log('Login successful');
      } else {
        console.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
