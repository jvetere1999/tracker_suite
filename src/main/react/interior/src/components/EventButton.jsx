import React from 'react';

const EventButton = ({ bgColor, color, size, text, borderRadius }) => {
    function callPort(parameter) {
        const url = `http://localhost:3001?eventID=${parameter}`;
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



export default EventButton;