import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function callPort(parameter) {
    const url = `/`;
    cookies.remove("profile_id");
    window.location.href = url;
}

class App extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => callPort("example")}>
                    Call Port and Remove Cookie
                </button>
            </div>
        );
    }
}

export default App;
