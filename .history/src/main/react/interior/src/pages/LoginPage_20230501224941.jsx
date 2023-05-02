import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post('https://50.122.223.254:8000/sign_in', {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        cookies.set('profile_id', response.data.profile_id, { path: '/' });
        navigate('/');
      } else {
        console.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
