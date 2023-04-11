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
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent 
                        content="Settings"
                        position="Top"
                    >
                     <button 
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                        style={{ background: currentColor, borderRadius: '50%'  }}                       
                    >
                        <FiSettings />
                    </button>
                </TooltipComponent>
                </div>

                {/* Left Side Sidebar pop out*/}
                {activeMenu ? (
                    <div className="w-72 h-0 fixed sidebar
                    dark:bg-main-dark-bg
                    bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 
                    dark:bg-secondary-dark-bg
                    bg-white">
                        <Sidebar />
                    </div>
                )}
                <div className={
                    `dark:bg-secondary-dark-bg bg-slate-100 min-h-screen w-full ${ activeMenu 
                        ? 'md:ml-72' 
                        : 'flex-2'}`
                }>
                    <div className="fixed md:static bg-slate-100 dark:bg-secondary-dark-bg navbar w-full">
                        <Navbar />
                    </div>


                    {themeSettings && <ThemeSettings />}


                    <div>
                     <Routes>
                         {/* Dashboard Home */}
                         <Route path="/" element={<Home />} />
                         <Route path="/Home" element={<Home />} />

                         {/* Pages */}
                         <Route path="/Event History" element={<EventHistory />} />
                         <Route path="/Create Event" element={<CreateEvent />} />
                         <Route path="/Attendees" element={<Attendees />} />
                         <Route path="/Find Events" element={<FindEvents />} />

                         {/* apps */}
                         <Route path="/Calendar" element={<Calendar />} />
                         <Route path="/Worklist" element={<Worklist />} />
                         <Route path="/Bar" element={<Bar />} />
                        
                         {/* switch mode */}
                          <Route path="/App" element={<App />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
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
