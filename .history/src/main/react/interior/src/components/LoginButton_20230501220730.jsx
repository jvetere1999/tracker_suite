import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoginButton = ({ bgColor, color, size, text, borderRadius }) => {
    function callPort(parameter) {
        const url = `/`;
        cookies.remove("profile_id");
        window.location.href = url;
    }

    return (
        <div>
            <button
                type="button"
                style={{ backgroundColor: bgColor, color, borderRadius }}
                className={`text-${size} p-3 hover:drop-shadow-xl`}
                onClick={() => callPort("testing123")}>
                {text}
            </button>
        </div>
    );
};



export default LoginButton;