//import React from 'react'
import { Header, Button, Event } from '../components';
import React, { useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import ReactDOM from "react-dom";
import TimePicker from 'react-time-picker';
import { Link } from "react-router-dom";
import EventButton from '../components/EventButton';


  const CreateEvent = () => {
    const { currentColor } = useStateContext();
    const [eventName, setEventName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName.trim() === "") {
      setErrorMessage("Please enter an event name.");
    } else {
      // Handle event submission logic here
    }
  };

  return (
    <div className=' m-2 md:m-10 p-2 md:p-10 drop-shadow-2xl dark:text-gray-200 dark:bg-main-dark-bg bg-white rounded-3xl'>
      <Header category="Page" title="Create Event" />
      <main className='mt-8 max-w-md'>
        <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit}>
          <label className="eventName">
            <span className="text-gray-700 dark:text-gray-200">Event Name:</span>
            <input type="text" className="
              p-2
              mt-1
              block
              w-full
              rounded-md
              drop-shadow-md
              dark:text-gray-700
              bg-gray-200
              border-gray-300
              focus:border-gray-500 focus:bg-white focus:ring-0
              " value={eventName}
              onChange={handleEventNameChange}></input>
              {errorMessage && (
              <p className="text-red-500 text-xs italic">{errorMessage}</p>
            )}
          </label>

          <label className="eventDate">
            <span className="text-gray-700 dark:text-gray-200">When is your Event?</span>
            <input type="date" className="
              p-2
              mt-1
              block
              w-full
              drop-shadow-md
              rounded-md
              dark:text-gray-700
              bg-gray-200
              border-gray-300
              focus:border-gray-500 focus:bg-white focus:ring-0
              "></input>
          </label>

          <label className="eventStartTime">
            <span className="text-gray-700 dark:text-gray-200">What time does your event Start?</span>
            <input type="time" className="
              p-2
              mt-1
              block
              w-full
              drop-shadow-md
              rounded-md
              dark:text-gray-700
              bg-gray-200
              border-gray-300
              focus:border-gray-500 focus:bg-white focus:ring-0
              "></input>
          </label>

          <label className="eventEndTime">
            <span className="text-gray-700 dark:text-gray-200">What time does your event end?</span>
            <input type="time" className="
              p-2
              mt-1
              block
              w-full
              rounded-md
              drop-shadow-md
              bg-gray-200
              border-gray-300
              dark:text-gray-700
              focus:border-gray-500 focus:bg-white focus:ring-0
              "></input>
          </label>

          <label className="eventLocation">
            <span className="text-gray-700 dark:text-gray-200">Where will your event be held?</span>
            <input type="text" className="
              p-2
              mt-1
              block
              w-full
              rounded-md
              drop-shadow-md
              dark:text-gray-700
              bg-gray-200
              border-gray-300
              focus:border-gray-500 focus:bg-white focus:ring-0
              "></input>
          </label>

          <label className="eventRepeat">
            <span className="text-gray-700 dark:text-gray-200">Does your event repeat?</span>
            <select className="
              p-2
              mt-1
              block
              w-full
              rounded-md
              drop-shadow-md
              dark:text-gray-700
              bg-gray-200
              border-gray-300
              focus:border-gray-500 focus:bg-white focus:ring-0
              ">
                <option></option>
                <option>No</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
          </label>
          
          <label className="eventDetails">
            <span className="text-gray-700 dark:text-gray-200">Additional Details(For you only):</span>
            <textarea className="
              
              mt-1
              block
              w-full
              rounded-md
              dark:text-gray-700
              drop-shadow-md
              bg-gray-200
              border-gray-300
              focus:border-gray-500 focus:bg-white focus:ring-0
              "rows="5" spellCheck="true"></textarea>
          </label>

          <EventButton
          color="white"
          bgColor={currentColor}
          text="Submit"
          borderRadius="10px"
          drop-shadow="md"
          className="popup-button w-100%"
          //onClick={() => callPort('papameter_value')}
          type="submit"/>
          
        </form>
      </main>
      </div>
  );
};

export default CreateEvent