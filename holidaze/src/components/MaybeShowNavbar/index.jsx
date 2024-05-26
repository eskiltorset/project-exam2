import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const MaybeShowNavbar = ({ children }) => {
    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false)
    const [showSearch, setShowSearch] = useState(false)


    useEffect(() => {
        if ((location.pathname != '/login' || location.pathname != '/register') && (localStorage.getItem("loggedInUser") != null)){
            setShowNavbar(false);
        }

        else {
            setShowNavbar(true);
        }
        
       
    }, [location])
    
    return (
        <div>
            {showNavbar && children}  
            {showSearch && children}  
        </div>
    )
}

export default MaybeShowNavbar;