import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";
// import "./venues.css";

// Fetching all venues
function Profile() {

      const [data, setData] = useState(null);
      
      const name = localStorage.getItem("loggedInUser");
      const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';

      const profile_url = `https://v2.api.noroff.dev/holidaze/profiles/${name}`;
      const profileBookings_url = `https://v2.api.noroff.dev/holidaze/profiles/${name}/bookings`;

    
      useEffect(() => {
        async function getData(url) {

          try {
            const token = localStorage.getItem("accessToken");
            const fetchOptions = {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                  "X-Noroff-API-Key": apiKey
              },
            }
        
            const response = await fetch(url, fetchOptions);
            const json = await response.json();
            // console.log(json);  

            setData(json);

            console.log(json)

          }

        catch (error) {
          console.log(error);
        }
      }

      getData(profile_url);

      const profileData = data;
      console.log(profileData)

      // getData(profileBookings_url);
      // const bookingData = data.data;
      // console.log(bookingData)
      }, []);


      if (data != null) {
        return (
          <div>
            <h1>{data.data.name}</h1>
            <p>{data.data.email}</p>
            {data.data.venueManager === false &&
                <p>Customer</p>
            }
            {data.data.venueManager === true &&
                <p>Venue Manager</p>
            }
            <p>Bookings: {data.data._count.bookings}</p>
    
          </div>
        );
      }
     
    }



export default Profile;