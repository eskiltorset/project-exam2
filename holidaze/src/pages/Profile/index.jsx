import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../../styles/global.css";

import ProfileBookings from '../../components/ProfileBookings';
import UpdateAvatar from '../../components/AvatarForm';

function Profile() {

      const [data, setData] = useState(null);
      const [venues, setVenues] = useState([]);

      const [isLoading, setIsLoading] = useState(false);
      const [isError, setIsError] = useState(false);

      // Modal variables
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      
      const name = localStorage.getItem("loggedInUser");
      const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';

      const profile_url = `https://v2.api.noroff.dev/holidaze/profiles/${name}?_bookings=true&_venues=true`;
    
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

            setData(json);
            setVenues(json.data.venues);

          }

        catch (error) {
          setIsLoading(false);
          setIsError(true);
        }
      }

      getData(profile_url);

      const profileData = data;

      }, []);

      if (isLoading) {
        return <div className='vh-100 text-center mt-5'>Loading venues ...</div>;
      }
    
      if (isError) {
        return <div>Error loading data</div>;
      }

      console.log(venues.length);

      if (data != null) {
        return (
          <div>
              <div className='top text-center'>
                <div className='bg-profile p-3'>
                <Button variant="outline-light" size="sm" className='float-end' onClick={handleShow}>Change Avatar</Button>

                    <div className='profile-avatar mt-3 mb-1'>
                      <br></br><img src={data.data.avatar.url} alt={data.data.name} className='rounded-circle'></img>
                      <br></br><h5>@{data.data.name}</h5>
                    </div>

                    {data.data.venueManager === false &&
                      <p>Customer</p>
                    }
                    {data.data.venueManager === true &&
                      <p>Venue Manager</p>
                    }


                </div>
                <Row className='pt-3 shadow-sm mb-4'>
                  <Col>
                    <p>Bookings: {data.data._count.bookings}</p>
                  </Col>
                  <Col>
                    <p>Venues: {data.data._count.venues}</p>
                  </Col>
                </Row>
              </div>

              <div className='venues'>
                <Row className='px-4 shadow-sm mb-3'>
                  <h4 className='text-center mb-2'>Your Venues</h4>
                  <div className='venues-div d-flex flex-row flex-wrap justify-content-between'>
                  {Array.from(venues).map((venue) => {
                  if(venue.media[0] != null) {
                    return (
                        <div key={venue.id} className='venue-card mt-4 mx-2'>
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
                                          
                    );
                  }
                  })}
                  </div>
                </Row>
              </div>
            
            <div className='bookings'>
              <ProfileBookings />
            </div>

              {/* Modal for bookings */}
              <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Avatar URL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UpdateAvatar />
                </Modal.Body>
              </Modal>
            </>
          </div>
        );
      }
     
    }



export default Profile;