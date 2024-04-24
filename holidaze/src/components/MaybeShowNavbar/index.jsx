import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const MaybeShowNavbar = ({ children }) => {
    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {
        console.log(location)
        if (location.pathname === '/venues' && localStorage.getItem("loggedInUser") != null){
            setShowNavbar(false);
        }
        else {
            setShowNavbar(true);
        }
    }, [location])
    
    return (
        <div>
            {showNavbar && children}  
        </div>
    )
}

export default MaybeShowNavbar;