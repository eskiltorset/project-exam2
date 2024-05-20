import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./venues.css";
import SearchBar from '../../components/Search';

// Fetching all venues
function Venues() {

    const url = 'https://v2.api.noroff.dev/holidaze/venues';
  
      const [venues, setvenues] = useState([]);
      // State for holding our loading state
      const [isLoading, setIsLoading] = useState(false);
      // State for holding our error state
      const [isError, setIsError] = useState(false);

      const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');
      const data = await response.json();
      const venues = data.data;
      
      // Filter out only the "name" from the JSON data
      const names = venues.map(item => item.name);

      // Filter the names based on the search term
      const filteredResults = names.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log(filteredResults);

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    
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
        <SearchBar onSearch={handleSearch}/>

        <div className='venues-div d-flex flex-row flex-wrap justify-content-evenly'>
         {Array.from(venues).map((venue) => {
          if(venue.media[0] != null) {
            return (
             
                <div key={venue.id} className='venue-card mt-4 mx-2 w-25'>
                   <Link to={`/venue/${venue.id}`} className='text-decoration-none text-reset'>
                <div>
                  <img src={venue.media[0].url} alt={venue.name} className='rounded'></img>
                  <div className='card-body-left mt-2 col-md-12'>
                  <p className='float-end'>{venue.rating}/5&#9733; </p>
                    <h5 className=''>{venue.name}</h5>
                    <h6>{venue.location.city}, {venue.location.country}</h6>
                    <p>{venue.maxGuests} guests</p>
                    <p className='venuePrice'><b>kr {venue.price}</b> pr night</p>
                    {/* <Link to={`/venue/${venue.id}`} className='btn btn-outline-secondary'>View Venue</Link> */}
                  </div>

                </div>
                </Link>
                </div>
                
            );
          }
          else{
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          }
          })}

        </div>
        </div>
      );
    }

    export default Venues;