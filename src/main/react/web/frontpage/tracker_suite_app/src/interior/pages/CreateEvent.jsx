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
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventRepeat, setEventRepeat] = useState("");
    const [eventNameError, setEventNameError] = useState("");
    const [eventDateError, setEventDateError] = useState("");
    const [eventStartTimeError, setEventStartTimeError] = useState("");
    const [eventEndTimeError, setEventEndTimeError] = useState("");
    const [eventLocationError, setEventLocationError] = useState("");
    const [eventRepeatError, setEventRepeatError] = useState("");
  //const [errorMessage, setErrorMessage] = useState("");

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };
  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
  };
  const handleEventStartTimeChange = (e) => {
    setEventStartTime(e.target.value);
  };
  const handleEventEndTimeChange = (e) => {
    setEventEndTime(e.target.value);
  };
  const handleEventLocationChange = (e) => {
    setEventLocation(e.target.value);
  };
  const handleEventRepeatChange = (e) => {
    setEventRepeat(e.target.value);
  };

  const handleErrors = (labelName, value) => {
    if (labelName === "eventName" && value.trim() === "") {
      return "Please enter an event name.";
    } else if (labelName === "eventDate" && value.trim() === "") {
      return "Please enter a date for your event.";
    } else if (labelName === "eventStartTime" && value.trim() === "") {
      return "Please enter a start time for your event.";
    } else if (labelName === "eventEndTime" && value.trim() === "") {
      return "Please enter an end time for your event.";
    } else if (labelName === "eventLocation" && value.trim() === "") {
      return "Please enter a location for your event.";
    }  else if (labelName === "eventRepeat" && value === "") {
        return "Please select if your event repeats.";
    } else {
      return "";
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const eventNameError = handleErrors("eventName", eventName);
    const eventDateError = handleErrors("eventDate", eventDate);
    const eventStartTimeError = handleErrors("eventStartTime", eventStartTime);
    const eventEndTimeError = handleErrors("eventEndTime", eventEndTime);
    const eventLocationError = handleErrors("eventLocation", eventLocation);
    const eventRepeatError = handleErrors("eventRepeat", eventRepeat);
  
    if (eventNameError || eventDateError || eventStartTimeError || eventEndTimeError || eventLocationError) {
      setEventNameError(eventNameError);
      setEventDateError(eventDateError);
      setEventStartTimeError(eventStartTimeError);
      setEventEndTimeError(eventEndTimeError);
      setEventLocationError(eventLocationError);
      setEventRepeatError(eventRepeatError);
    } else {
      // Handle event submission logic here
      const qrdata = {
        eventName : eventName,
        eventDate : eventDate,
        eventStartTime : eventStartTime,
        eventEndTime : eventEndTime,
        eventLocation : eventLocation,
        eventRepeat : eventRepeat
      }
      const qrdatajson = JSON.stringify(qrdata)
      const url = `http://localhost:3001?eventID=${qrdatajson}`;
      window.location.href = url;
    }
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (eventName.trim() === "") {
  //     setErrorMessage("Please enter an event name.");
  //   } else {
  //     // Handle event submission logic here
  //   }
  // };

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
              {eventNameError && (
              <p className="text-red-500 text-xs italic">{eventNameError}</p>
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
              " value={eventDate}
              onChange={handleEventDateChange}></input>
              {eventDateError && (
              <p className="text-red-500 text-xs italic">{eventDateError}</p>
            )}
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
              " value={eventStartTime}
              onChange={handleEventStartTimeChange}></input>
              {eventStartTimeError && (
              <p className="text-red-500 text-xs italic">{eventStartTimeError}</p>
            )}
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
              " value={eventEndTime}
              onChange={handleEventEndTimeChange}></input>
              {eventEndTimeError && (
              <p className="text-red-500 text-xs italic">{eventEndTimeError}</p>
            )}
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
              " value={eventLocation}
              onChange={handleEventLocationChange}></input>
              {eventLocationError && (
              <p className="text-red-500 text-xs italic">{eventLocationError}</p>
            )}
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
              " value={eventRepeat}
              onChange={handleEventRepeatChange}>
                <option></option>
                <option>No</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              {eventRepeatError && (
              <p className="text-red-500 text-xs italic">{eventRepeatError}</p>
            )}
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

          <button 
              type="button"
              color="white"
              bgColor={currentColor}
              borderRadius="10px"
              className="popup-button w-100% h-20"
              onClick={handleSubmit}>
              Submit
          </button>
          {/* <EventButton
          color="white"
          bgColor={currentColor}
          text="Sumbit"
          borderRadius="10px"
          drop-shadow="md"
          className="popup-button w-100%"
          //onClick={() => callPort('papameter_value')}
          type="submit"/> */}
          
        </form>
      </main>
      </div>
  );
};

export default CreateEvent