import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const MaybeShowSearch = ({ children }) => {
    const location = useLocation();

    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        if ((location.pathname != '/venues')){
            setShowSearch(false);
        }
        else {
            setShowSearch(true);
        }
    }, [location])
    
    return (
        <div>
            {showSearch && children}  
        </div>
    )
}

export default MaybeShowSearch;