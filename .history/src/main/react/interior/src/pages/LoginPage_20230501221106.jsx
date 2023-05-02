import React from 'react';
import { useForm } from 'react-hook-form';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

const cookies = new Cookies();

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    // Set the "profile_id" cookie and redirect to the main page
    cookies.set('profile_id', data.username, { path: '/' });
    history.push('/');
  };

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
};

export default LoginPage;
