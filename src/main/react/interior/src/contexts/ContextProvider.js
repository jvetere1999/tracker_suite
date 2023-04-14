import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = { 
    Chat: false, 
    userProfile: false,
    Notification: false,
    
}
export const ContextProvider = ({ children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState (undefined);
    const [currentColor, setcurrentColor] = useState('#03C9D7')
    const [currentMode, setcurrentMode] = useState('Light')
    const [themeSettings, setThemeSettings] = useState(false)

    const setMode = (e) => { 
        setcurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);

        setThemeSettings(false);
    }

    const setColor = (color) => { 
        setcurrentColor(color);
        localStorage.setItem('colorMode', color);

        setThemeSettings(false);
    }
    
    
    const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

    return (
        <StateContext.Provider
            value={{ 
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor,
                currentMode,
                themeSettings,
                setcurrentColor,
                setcurrentMode,
                setThemeSettings,
                setMode,
                setColor
            }}
        >
            {children}
        </StateContext.Provider>
        )
    }

    export const useStateContext = () => useContext
    (StateContext);