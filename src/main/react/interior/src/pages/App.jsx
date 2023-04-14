import UserForm from "../components";

function App() {
    const user ={
        name: "She-Hulk",
        email: "jen@hulk.com",
        website: "www.shehulk.com",
        country:"usa",
    };

    const handleSave = (values) => {
        console.log({values});
    };

    return ( 
        <div className="App">
            <h1>React Form</h1>
            <div className="form">
                <UserForm onSave={handleSave} {...{ user }} />
            </div>
        </div>
    );
}

export default App