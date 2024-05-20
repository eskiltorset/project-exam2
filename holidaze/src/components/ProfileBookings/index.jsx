import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'

import { format } from 'date-fns';

function ProfileBookings() {

    const [data, setData] = useState(null);
    const [venues, setVenues] = useState([]);

    // State for holding our loading state
    const [isLoading, setIsLoading] = useState(false);
    // State for holding our error state
    const [isError, setIsError] = useState(false);
    
    const name = localStorage.getItem("loggedInUser");
    const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';

    const profileBookings_url = `https://v2.api.noroff.dev/holidaze/profiles/${name}/bookings?_customer=true&_venue=true`;

  
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
          console.log(json);  

          setVenues(json.data);

        }

      catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData(profileBookings_url);

    console.log(venues);


    }, []);

    if (isLoading) {
        return <div>Loading venues</div>;
    }

    if (isError) {
    return <div>Error loading data</div>;
    }

    

    if (venues) {
        return (
                <Row className='px-4'>
                    <h4 className='text-center mb-3'>Your Upcoming Bookings</h4>
                    {Array.from(venues).map((venue) => {

                        let fromDate = format(venue.dateFrom, 'MMM do yyyy');
                        let toDate = format(venue.dateTo, 'MMM do yyyy');
                        
                        return (
                            <Col>
                                <div key={venue.id} className='venue-card mt-2 w-100 px-3'>
                                    <Link to={`/venue/${venue.id}`} className='text-decoration-none text-reset'>
                                    <div>
                                        <img src={venue.venue.media[0].url} alt={venue.name} className='rounded'></img>
                                        <div className='card-body-left mt-2 col-md-12'>
                                        <p className='float-end'>{venue.venue.rating}/5&#9733; </p>
                                        <h5 className=''>{venue.venue.name}</h5>
                                        <h6>{venue.venue.location.city}, {venue.venue.location.country}</h6>
                                        <p>{venue.venue.maxGuests} guests</p>
                                        <h6> {fromDate} - {toDate}</h6>
                                        <p className='venuePrice'><b>kr {venue.venue.price}</b> pr night</p>
                                        
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
        ); 
    }
}   


export default ProfileBookings;