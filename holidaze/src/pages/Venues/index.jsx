import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// import "./venues.css";

// Fetching all venues
function Venues() {

    const url = 'https://v2.api.noroff.dev/holidaze/venues';
  
      const [venues, setvenues] = useState([]);
      // State for holding our loading state
      const [isLoading, setIsLoading] = useState(false);
      // State for holding our error state
      const [isError, setIsError] = useState(false);
    
      useEffect(() => {
        async function getData() {
          try {
            // Reset the error state in case there as an error previously
            setIsError(false);
            // Turn on the loading state each time we do an API call
            setIsLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.data);
            console.log(response);
            setvenues(json.data);
            // Clear the loading state once we've successfully got our data
            setIsLoading(false);
          } catch (error) {
            // Clear the loading state if we get an error and then
            // set our error state to true
            setIsLoading(false);
            setIsError(true);
          }
        }
    
        getData();
      }, []);
    
      if (isLoading) {
        return <div>Loading venues</div>;
      }
    
      if (isError) {
        return <div>Error loading data</div>;
      }
    
      return (
        <div className='m-3'> <h1 className="text-center p-3">Venues</h1>
        <div className='venues-div d-flex flex-row flex-wrap justify-content-evenly'>
         {Array.from(venues).map((venue) => {
          // const price = document.getElementsByClassName('venuePrice');
          // console.log(price)
          // const discount = venue.price - venue.discountedPrice;
          // const discountPercentage = (discount / venue.price) * 100; 
          
          // if(venue.price != venue.discountedPrice){
    
          //   price.innerText = `${venue.discountedPrice},-`;
          // }
    
          // else{
          //   price.innerText = `${venue.price},-`;
          // }
            return (
                <div className='mt-4 mx-2 w-25'>
                <div key={venue.id}>
                  <img src={venue.media[0].url} alt={venue.name} className='w-100 rounded'></img>
                  <div className='card-body-left mt-2 col-md-8'>
                    <h5 className=''>{venue.name}</h5>
                    <h6>{venue.location.city}, {venue.location.country}</h6>
                    <p>{venue.maxGuests} guests</p>
                    <p className='venuePrice'><b>kr {venue.price}</b> pr night</p>
                    <Link to={`/venue/${venue.id}`} className='btn btn-outline-secondary'>View Venue</Link>
                  </div>
                  <div className='card-body-right p-3 w-25 col-md-4 float-end'>
                    <p className=''>{venue.rating}/5&#9733; </p>
                  </div>

                </div>
                </div>
            );
          })}
        </div>
        </div>
      );
    }

    export default Venues;