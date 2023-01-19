import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './Login';
import CreateEvent from './EventsForm'
import ErrorPage from './error-page'
import EditEvent from './EditEvent';
import EventCheckInTable from './EventCheckInTable';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
    {
      path: "login",
      element: <Login/>,
      errorElement: <ErrorPage />
    },
    {
      path: "create-event",
      element: <CreateEvent/>,
      errorElement: <ErrorPage />
    },
    {
      path: "view-event/:id",
      element: <EventCheckInTable/>,
      errorElement: <ErrorPage />
    },
    {
      path: "edit-event",
      element: <EditEvent/>,
      errorElement: <ErrorPage />
    }
  ]}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
