import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'
// import "./venues.css";

// Fetching all venues
function Profile() {

      const [data, setData] = useState(null);
      const [venues, setVenues] = useState([]);
      
      const name = localStorage.getItem("loggedInUser");
      const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';

      const profile_url = `https://v2.api.noroff.dev/holidaze/profiles/${name}?_bookings=true&_venues=true`;
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
            setVenues(json.data.venues);

            console.log(data);
            console.log(venues);
          }

        catch (error) {
          console.log(error);
        }
      }

      getData(profile_url);

      const profileData = data;
      console.log(profileData)

      // getData(profileBookings_url);
      
      // console.log(bookingData)
      }, []);

      // const item = data;


      if (data != null) {
        return (
          <div className='vh-100'>
            <div className='top text-center'>
              <div className='bg-light p-3'>
                  <div className='avatar-container mt-3 mb-1'>
                    <img src={data.data.avatar.url} alt={data.data.name} className='rounded-circle'></img>
                    <b>{data.data.name}</b>
                  </div>
            
              
                  {data.data.venueManager === false &&
                    <p>Customer</p>
                  }
                  {data.data.venueManager === true &&
                    <p>Venue Manager</p>
                  }
              </div>
              <Row className='pt-3'>
                <Col>
                  <p>Bookings: {data.data._count.bookings}</p>
                </Col>
                <Col>
                  <p>Venues: {data.data._count.venues}</p>
                </Col>
                <hr className="hr" />
              </Row>
            </div>
            <Row className='px-4'>
              <h2 className='text-center mb-3'>Your venues</h2>
            {Array.from(venues).map((venue) => {
            if(venue.media[0] != null) {
              return (
                  <Col>
                  <div key={venue.id} className='venue-card mt-2 w-100 px-3'>
                    <Link to={`/venue/${venue.id}`} className='text-decoration-none text-reset'>
                      <div>
                        <img src={venue.media[0].url} alt={venue.name} className='rounded'></img>
                        <div className='card-body-left mt-2 col-md-12'>
                        <p className='float-end'>{venue.rating}/5&#9733; </p>
                          <h5 className=''>{venue.name}</h5>
                          <h6>{venue.location.city}, {venue.location.country}</h6>
                          <p>{venue.maxGuests} guests</p>
                          <p className='venuePrice'><b>kr {venue.price}</b> pr night</p>
                        </div>

                      </div>
                    </Link>
                  </div>
                  </Col>
               
                 
                  
              );
            }
            })}
             </Row>
          </div>
        );
      }
     
    }



export default Profile;