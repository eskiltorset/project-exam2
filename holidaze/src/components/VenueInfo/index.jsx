import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Cartcontext } from '../../context/context';
// import "./singleProduct.css";
// import "./singleVenue.css";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Remove from '../../components/Delete';
// import Update from '../../components/Update';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import UpdateVenueModal from '../../components/EditVenueModal'
// import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Booking from '../../components/CreateBooking';

function VenueInfo() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        async function getData(url) {
          try {
            setIsLoading(true);
            setIsError(false);
    
            const response = await fetch(url);
            const json = await response.json();
    
            setData(json);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }
    
        getData(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`);
    }, [id]);

    if (isLoading || !data) {
        return <div>Loading</div>;
      }
    
      if (isError) {
        return <div>Error</div>;
      }

    const item = data.data;

    return (
        <div className='left-content d-flex item-div col-lg-7'>
            <div className='m-2 w-100'>
                <div key={item.id}>
                <h5 className='mt-2'>{item.name}</h5>
                <img src={item.media[0].url} alt={item.name}className='w-100'></img>
                <div className='card-body p-3'>
                    <p className='float-end'>{item.rating}/5&#9733; </p>
                    <h6>{item.location.city}, {item.location.country}</h6>
                    <p>{item.maxGuests} guests</p>
                    <p>{item.description}</p>
                    <div className='avatar-container'>
                    <small>published by<br/></small>
                    <img src={item.owner.avatar.url} alt={item.owner.name}className='rounded-circle'></img>
                    <small><b>{item.owner.name}</b></small>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default VenueInfo;

