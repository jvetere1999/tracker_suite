import React from 'react';
import './Button.css';
import { useAuth0 } from "@auth0/auth0-react";

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const { loginWithRedirect , isAuthenticated,isLoading} = useAuth0();
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  return (
    ! isAuthenticated && (
    <div className='btn-mobile'>
      
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={() => loginWithRedirect()}
        type={type}
      >
        {children}
      </button>
      
    </div>
    )
  );
  
  
    
  
}; 