import React from 'react';

const LogoutButton = ({ bgColor, color, size, text, borderRadius }) => {
    function callPort(parameter) {
        const url = `/`;
        cook
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



export default LogoutButton;