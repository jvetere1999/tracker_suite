import React from 'react';
import { useForm } from 'react-hook-form';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const cookies = new Cookies();

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      // Replace the URL below with your backend API URL
      const response = await axios.post('https://50.122.223.254:8000/sign_in', {
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        // Set the "profile_id" cookie and redirect to the main page
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
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <TextBoxComponent
            id="username"
            name="username"
            inputRef={register({ required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <TextBoxComponent
            id="password"
            name="password"
            type="password"
            inputRef={register({ required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <ButtonComponent type="submit" cssClass="e-primary">Login</ButtonComponent>
      </form>
    </div>
  );
}

export default LoginPage;
