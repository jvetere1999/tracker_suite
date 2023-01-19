import React, { useState } from "react";
import ReactDOM from "react-dom";
import TimePicker from 'react-time-picker';
import { Link } from "react-router-dom";
import post from './Post'
import Event from "./Event"

export default function CreateEvent() {
  // React States
  const [timeStart, onChange1] = useState('10:00');
  const [timeEnd, onChange2] = useState('11:00');
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];



  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
   
    const eventObjc = new Event(
      "1",
      event.target[0].value,
      timeStart,
      timeEnd,
      event.target[13].value,
      event.target[14].value
    );
    console.log(eventObjc)
    post( '/create-event', eventObjc)
    
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Event Name</label>
          <input type="text" name="eventName" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Start-time </label>
          <TimePicker onChange={onChange1} value={timeStart} />
          {renderErrorMessage("Start time")}
        </div>
        <div className="input-container">
          <label>End-time </label>
          <TimePicker onChange={onChange2} value={timeEnd} />
          {renderErrorMessage("End time")}
        </div>
        <div className="input-container">
          <label>Device ID</label>
          <input type="text" name="device_id"/>
        </div>
        <div className="input-container">
          <label>Description</label>
          <input type="text" name="desc"/>
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Create a New Event</div>
        {isSubmitted ? 
        <div>Event Succefully Created 
            {}
            <br/>
            <Link to="/view-event">View event</Link></div> : renderForm}
        </div>
    </div>
  );
}
