import { Outlet, Link} from "react-router-dom";
import './App.css'


function App() {
  return (
    <>
       <div id="sidebar">
        <h1>Tracker Edge</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <Link to={`/create-event`}>
            <button type="submit">New</button>
            </Link>
          </form>
        </div>
        <nav>
          <ul>
          <li>
              <Link to={`/login`}>Login</Link>
            </li>
            <li>
              <Link to={`/create-event`}>Create Event</Link>
            </li>
            <li>
              <Link to={`/edit-event`}>Edit Event</Link>
            </li>
            <li>
              <Link to="/view-event/0">View event</Link>
            </li>
            <li>
              <Link to="/delete-event">Delete event</Link>
            </li>
            <li>
              <Link to="/list-events">List events</Link>
            </li>
          </ul>
        </nav>
      </div>
  
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
} P!cknewPWD

export default App;
