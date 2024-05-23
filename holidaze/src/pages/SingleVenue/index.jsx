import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Cartcontext } from '../../context/context';
// import "./singleProduct.css";
import "./singleVenue.css";
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
import "../../styles/global.css";


// IMPORT COMPONENTS
import Booking from '../../components/CreateBooking';
import VenueInfo from '../../components/VenueInfo';

const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
const token = localStorage.getItem("accessToken");

function Venue() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  const schema = yup
  .object({
  dateFrom: yup
  .string()
  .min(2, 'Your name should be at least 2 characters.')
  .max(50, 'Your name cannot be longer than 20 characters.')
  .required('Please enter the startdate'),
  dateTo: yup
      .string()
      .required('Please enter the endDate.'),
  guests: yup
      .number()
      .required('Your max guest should be between 1-20 people'),
  })
  .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
    resolver: yupResolver(schema),
    });


//   // VARIABLES FOR MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        console.log(json)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`);
  }, [id]);

  if (isLoading || !data) {
    return <div className='vh-100 text-center mt-5'>Loading venues ...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);
  const item = data.data;

  console.log(item);

  const bookings = data.data.bookings;
  console.log(bookings);

if (item.owner.name == localStorage.getItem("loggedInUser")){

  return (
    <div className='min-vh-100 h-auto container row justify-content-center mt-3 col-lg-12 w-100 mx-auto'>
      <VenueInfo></VenueInfo>
      <div className='right-content col-lg-5 mt-5'>
        <div className='w-100 h-auto border rounded p-3'>
          <h5>{item.price}kr pr night</h5>
          <hr className="hr" />
          <div className='button-container justify-content-around'>
            <Button className='col-sm-5 outline-primary primary-button-outline'><Link className='text-decoration-none text-reset' to={`/edit/${item.id}`}>Edit Venue</Link></Button>
            <Button className='col-sm-5 float-end outline-danger primary-button-outline' type="submit" 
              onClick={() => { if (window.confirm('Are you sure you want to delete this venue?')) Remove(item.id) } }>Delete Venue</Button>
            <Button className='w-100 mt-3 primary-button' onClick={handleShow}>View Bookings</Button>
          </div>
       
        </div>
      </div>

      {/* Modal for bookings */}
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>You got {item._count.bookings} booking(s):</Modal.Body>
        {Array.from(bookings).map((booking) => {

          // console.log(booking.customer.name);

        let fromDate = format(booking.dateFrom, 'MMM do yyyy');
        let toDate = format(booking.dateTo, 'MMM do yyyy');

        return (<Modal.Body>{booking.customer.name} | {fromDate} - {toDate}</Modal.Body>)
      })}
        <Modal.Footer>
          <Button className='primary-button' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
    </div>

    
  );
  
}



else {
  return (
    <div className='min-vh-100 container row justify-content-center mt-3 col-lg-12 w-100 mx-auto'>
      <VenueInfo></VenueInfo>
      <div className='right-content col-lg-5 mt-5 h-auto'>
        <div className='w-100 h-auto border rounded p-3'>
          <h5>{item.price}kr pr night</h5>
          <hr className="hr" />
          <Booking onSubmit={handleSubmit}></Booking>
          </div>
        </div>
      </div>
  );
}

}

export default Venue;