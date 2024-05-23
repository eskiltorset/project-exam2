import React from 'react';
import { useParams } from 'react-router-dom';

async function Remove(id){

    const remove_URL = `https://v2.api.noroff.dev/holidaze/venues/${id}`;
    const token = localStorage.getItem('accessToken');
    console.log(token)
    const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
    const name = localStorage.getItem("loggedInUser");

    try{

        const options = {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": apiKey
            }
        };

        const response = await fetch(remove_URL, options);
        console.log(response);  

        if (response.ok){
            console.log("Venue deleted")
            // errorMessage.inenrText = "Venue deleted";
            setTimeout(() => {
                window.location.href = `/profile/${name}`;
              }, 500);
        }
    }
    catch (error){
        console.log(error);
    };

    return (
        <p className='text-successful'>Venue deleted</p>
    )
}

export default Remove;