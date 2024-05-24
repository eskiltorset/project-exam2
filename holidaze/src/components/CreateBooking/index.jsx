import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'; 
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Row, Col } from 'react-bootstrap'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import "../../styles/global.css";

const error_message = document.getElementsByClassName("error-message");
const success_message = document.getElementsByClassName("register-success");

function Booking() {

    const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
    const token = localStorage.getItem("accessToken");

    // const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    const [bookings, setBookings] = useState(null);

    const initialValues = [{
        fromDates: '',
        endDates: '',
    }]

    if (bookings){
        for (let i = 0; i < bookings.length; i++) {
            initialValues.push({ fromDates: (bookings[i].dateFrom), endDates: (bookings[i].dateTo) });
        }
    }

    let { id } = useParams();

    const [guests, setGuests] = useState(0);

    // const [dateRange, setDateRange] = useState([
    //     {
    //       startDate: new Date(),
    //       endDate: new Date(),
    //       key: 'selection',
    //     },
    //   ]);

    // VARIABLES FOR CALENDAR
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    // CONSTANT FOR CALENDAR BOOKING
    const handleChange = (ranges) => {
        setDate(ranges.selection);
    }

    const handleClick = () => {
        setOpenDate((prev) => !prev);
    }

    const millisecondsDiff = new Date(date.endDate).getTime() - new Date(date.startDate).getTime();
    const total_seconds = parseInt(Math.floor(millisecondsDiff / 1000));
    const total_minutes = parseInt(Math.floor(total_seconds / 60));
    const total_hours = parseInt(Math.floor(total_minutes / 60));
    const daysDiff = parseInt(Math.floor(total_hours / 24));

    useEffect(() => {
        async function getData(url) {
          try {
            const response = await fetch(url);
            const json = await response.json();
    
            setData(json);
            setBookings(json.data.bookings);
          } catch (error) {
            console.log(error);
          }
        }
    
        getData(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`);
    }, [id]);

    if (isLoading || !data) {
        return <div>Loading</div>;
      }
    
      if (isError) {
        return <div>Error</div>;
      }

    const item = data;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {

        const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey
            },
            body: JSON.stringify({ 
                dateFrom: date.startDate, 
                dateTo: date.endDate, 
                venueId: id,
                guests: guests
            })
        });

        console.log(response);
        const json = await response.json();
        console.log(json);

        if (response.ok) {
            success_message[0].innerText = "Booking successfull!";
            error_message[0].innerText = '';
            handleClick();
            setGuests(0);
        } else {
            error_message[0].innerText = json.errors[0].message;
            success_message[0].innerText = '';
        }
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
              <span className='calendar w-100 text-center'> 
              <span className='calendar' onClick={handleClick}>
              <Row>
                <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Start date"
                    className="mb-3"
                >
                    <Form.Control value={`${format(date.startDate, 'MMM dd yyyy' )}`} className='w-100' onChange={handleChange}/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="End date"
                    className="mb-3"
                >
                    <Form.Control value={`${format(date.endDate, 'MMM dd yyyy' )}`} className='w-100' onChange={handleChange}/>
                </FloatingLabel>
                </Col>
              </Row>
              </span>
              
              
                
              </span>
              { openDate && <DateRange
                  ranges={[date]}
                  onChange={handleChange}
                  minDate={new Date()}
                  direction="horizontal"
                  className='w-100'
                  rangeColors={["#D33753"]}
                  disabledDates=
                      {Array.from(initialValues).map((date) => {

                          return (
                                  date.fromDates,
                                  date.endDates
                          )
                      })}  
              /> }
                
                <FloatingLabel
                  controlId="floatingInput"
                  label="Guests"
                  className="mb-3 w-100"
                >
                  <Form.Control type="number" value={guests} 
                  onChange={(e) => setGuests(e.target.valueAsNumber)}/>
                </FloatingLabel>
    
                <Button className='mt-3 primary-button' type="submit">Reserve</Button>

                <Form.Text className='register-success text-success'></Form.Text>
                <Form.Text className='error-message text-danger'></Form.Text>
              </Form>
              <p className='float-end mt-3'>{item.data.price * daysDiff} kr</p>
              <p className='mt-3'>{item.data.price}kr x {daysDiff} nights</p>
              <hr className="hr" />
              <h6 className='float-end'>{item.data.price * daysDiff} kr</h6>
              <h6>Total: </h6>
            </div>
    );      
}

export default Booking;

    // const createBooking_URL = 'https://v2.api.noroff.dev/holidaze/bookings';
    // const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';

    // let { id } = useParams();

//     async function CreateBooking(url, bookingData) {

//         const token = localStorage.getItem("accessToken");

//             try {
//                 const postData = {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                         "X-Noroff-API-Key": apiKey
//                     },
//                     body: JSON.stringify(bookingData),
//                 };

//                 const response = await fetch(url, postData);
//                 console.log(response);
//                 const json = await response.json();
//                 console.log(json);

//                 if (response.status === 200) {
//                     console.log("Booking successful!");
                    
//                 }
                
//                 else {
//                     console.log("Booking failed!");
//                 }

//             } catch (error) {
//                 console.log(error);
//                 // console.log(error_message);
//             }
//         }

//             try {

//             console.log(id);

//                 let booking = {
//                     venueId: id            
//                     // dateFrom: data.dateFrom,
//                     // dateTo: data.dateTo,
//                     // guests: data.guests
//                 };

//                 CreateBooking(`${createBooking_URL}`, booking);

//             }

//             catch(error) {
//                 console.log(error);
//             }
// }

// export default Booking;