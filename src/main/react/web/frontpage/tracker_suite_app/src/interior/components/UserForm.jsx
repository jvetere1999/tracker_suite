import { useState } from "react";
import validtor from "validator";
import Select from "react-select";
import {userForm } from 'react-hook-form';

const countryOptions =[
    {value: "asgard", lable: "Asgard" },
    {value: "scotland", lable: "Scotland" },
    {value: "usa", lable: "USA" },
];

const UserForm =({ onSave, user ={} }) => {
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});

    const { name, email, website, country} = userData;
        
    const validateData = () => {
        let errors = {};

        if(!name) {
            errors.name = "Name is required";
        }

        if(!validator.isEmail(email)) {
            errors.email = " A valid email is required";
        }

        if(!validator.isURL(website)) {
            errors.website = " A valid web address is required";
        }

        return errors
    ;}

    const handleChange = (event) => {
        const {name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value}))
    }

    const handleSelectChange = (option) => {
        setUserData((prevData) => ({ ...prevData, country: option}))
    }

    const handleSave = () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            //there are errors, do not continue saving
            return;
        }

        setErrors({});
        console.log(userData);
        onSave(userData);
    };

    return (
        <div>
            <div>
                <p>Name</p>
                <input name="name" value={name} onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.name}</div>
            </div>

            <div>
                <p>Email</p>
                <input name="email" value={email} onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.email}</div>
            </div>

            <div>
                <p>Website</p>
                <input name="website" value={website} onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.website || ""}</div>
            </div>

            <div>
                <p>Country</p>
                <Select
                    value={countryOptions.find(({ value }) => value === userData.counrty)}
                    onChange={handleSelectChange}
                    oprions={countryOptions}
                    />
            </div>

            <div style={{ marginTop: "12px" }}>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default UserForm

