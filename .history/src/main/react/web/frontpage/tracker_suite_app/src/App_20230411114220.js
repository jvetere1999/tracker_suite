import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import services from './components/pages/services';
import LoginButton from './components/pages/LoginButton';
import Profile from './components/pages/Profile';


function App() {
  return (

      <div className="App" >
        
        <Router> 
        <Navbar/> 
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/services' exact component={services}/>
          <Route path='/LoginButton' exact component={LoginButton}/>
          <Route path='/Profile' exact component={Profile}/>
        </Switch>
        </Router>
        
      </div>
    
  );
}

export default App;
