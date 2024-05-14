import React from "react";

function SignOut() {
    try{
        console.log("logging out");
        localStorage.clear();
        window.location.href = '/login';
    }
    catch(error){
        console.log(error);
    }

    return (
        <div></div>
    )
}

export default SignOut;