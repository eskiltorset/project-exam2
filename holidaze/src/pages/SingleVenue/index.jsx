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
import Booking from '../../components/CreateBooking';
// import { CreateBooking } from '../../components/CreateBooking';
// import { OnSubmit } from '../../components/CreateBooking'


// export const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
const token = localStorage.getItem("accessToken");

function Venue() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState('');

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

//   // VARIABLES FOR CALENDAR
//   const [openDate, setOpenDate] = useState(false);
//   const [date, setDate] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection',
//   });

//   const onChange = (props) => {
//     const startDate = props.startDate;
//     const endDate = props.endDate;
// };

//   // CONSTANT FOR CALENDAR BOOKING
//   const handleChange = (ranges) => {
//     setDate(ranges.selection);
//   }

//   const handleClick = () => {
//     setOpenDate((prev) => !prev);
//   }

  // const handleSubmitBooking = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //         "X-Noroff-API-Key": apiKey
  //       },
  //       body: JSON.stringify({ 
  //         dateFrom, 
  //         dateTo, 
  //         venueId: id,
  //         guests 
  //       })
  //     });

  //     console.log(response);
  //     const json = await response.json();
  //     console.log(json);
  //     console.log(json.guests);

  //     if (response.ok) {
  //       console.log('Booking successful!');
  //       // Reset form after successful booking
  //       setDateFrom('');
  //       setDateTo('');
  //       setGuests('');
  //     } else {
  //       console.log('Booking failed!');
  //       // Handle error
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // Handle error
  //   }
  // };

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

  // console.log(data);

  const item = data.data;

if (item.owner.name == localStorage.getItem("loggedInUser")){
  return (
    <div className='vh-100 container row justify-content-center mt-3 col-lg-12 w-100'>
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
              {/* <button onClick={() => dispatch({type: 'ADD', payload: item })} className='btn btn-outline-secondary mb-3 float-end'>Add to cart</button> */}
            </div>
          </div>
          </div>
      </div>
      <div className='right-content col-lg-5 mt-5'>
        <div className='w-100 h-auto border p-3'>
          <h5>{item.price}kr pr night</h5>
          <hr class="hr" />
          <div className='button-container justify-content-around'>
            <Button className='col-sm-5'><Link className='text-decoration-none text-reset' to={`/edit/${item.id}`}>Edit Venue</Link></Button>
            <Button className='col-sm-5 float-end' onClick={() => Remove(item.id)}>Delete Venue</Button>
            <Button className='w-100 mt-3' onClick={handleShow}>View Bookings</Button>
          </div>
        </div>
      </div>

      {/* Modal for bookings */}
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>You got {item._count.bookings} bookings:</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
    <div className='vh-100 container row justify-content-center mt-3 col-lg-12 w-100'>
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
              {/* <button onClick={() => dispatch({type: 'ADD', payload: item })} className='btn btn-outline-secondary mb-3 float-end'>Add to cart</button> */}
            </div>
          </div>
          </div>
      </div>
      <div className='right-content col-lg-5 mt-5'>
        <div className='w-100 h-auto border p-3'>
          <h5>{item.price}kr pr night</h5>
          <hr class="hr" />
          <Booking onSubmit={handleSubmit}></Booking>

          {/* <Form onSubmit={handleSubmitBooking}>
          <span className='calendar w-100 text-center'> */}
          {/* <FloatingLabel
            controlId="floatingInput"
            label="Start date"
            className="mb-3 w-100"
          >
            <Form.Control type="date" value={dateFrom} 
            onChange={(e) => setDateFrom(e.target.value)}{...register('dateFrom')}/>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="End date"
            className="mb-3 w-100"
          >
            <Form.Control type="date" value={dateFrom} 
            onChange={(e) => setDateFrom(e.target.value)} {...register('dateTo')}/>
          </FloatingLabel> */}
          {/* <span className='calendar' onClick={handleClick}>
            <input value={`Start date: ${format(date.startDate, 'MMM dd yyyy' )}`} className='w-50'/>
            <input value={`End date: ${format(date.endDate, 'MMM dd yyyy' )}`} className='w-50'/>
          </span>
            
          </span>
          { openDate && <DateRange
            ranges={[date]}
            onChange={handleChange}
            minDate={new Date()}
            direction="horizontal"
            className='w-100'
            change={onChange}
            /> }

            <FloatingLabel
              controlId="floatingInput"
              label="Guests"
              className="mb-3 w-100"
            >
              <Form.Control type="number" min="1" max={`${item.maxGuests}`}  value={guests} 
              onChange={(e) => setGuests(e.target.value)} placeholder={`${item.maxGuests}`}/>
            </FloatingLabel>

            <Button className='w-100 mt-3' type="submit">Reserve</Button>
          </Form> */}
          </div>
        </div>

      </div>
    // </div>
  );
}

}

export default Venue;