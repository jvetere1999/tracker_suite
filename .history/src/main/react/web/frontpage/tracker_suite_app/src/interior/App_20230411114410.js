import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, EventHistory, Calendar, CreateEvent, Attendees, Worklist, FindEvents, SwitchMode, Bar} from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';


const App = () => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
    
  return (
    <div className={currentMode === 'Dark' ? 'dark' :  ''}>
    <div>
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
    </div>
    </div>
  )
}

export default App
             