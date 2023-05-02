import React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function LoginLogoutButton({ currentColor }) {
  const isLoggedIn = cookies.get('profile_id');

  const handleLogout = () => {
    cookies.remove('profile_id');
    
    window.location.reload();
  };
  const MyLink = () => (
    <a href="/login">LOGIN</a>
  );
  
  if (isLoggedIn) {
    return (
      <ButtonComponent
        color="white"
        text="Logout"
        borderRadius="10px"
        drop-shadow="md"
        className="popup-button w-100%"
        onClick={handleLogout}
      />
    );
  } else {
    return (
      <ButtonComponent
        color="white"
        bgColor={currentColor}
        text="Login"
        borderRadius="10px"
        drop-shadow="md"
        className="popup-button w-100%"
        onClick={MyLink}
        type="Login"
      />
    );
  }
}

export default LoginLogoutButton;
