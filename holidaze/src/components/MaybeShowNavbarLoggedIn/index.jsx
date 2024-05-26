import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const MaybeShowNavbarLoggedIn = ({ children }) => {
    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {

        if ((localStorage.getItem("loggedInUser") != null)){
            setShowNavbar(true);
        }

        else {
            setShowNavbar(false);
        }
        
       
    }, [location])
    
    return (
        <div>
            {showNavbar && children}  
        </div>
    )
}

export default MaybeShowNavbarLoggedIn;