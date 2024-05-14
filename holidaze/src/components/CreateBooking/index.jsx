import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useEffect, useState } from 'react'; 
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Row, Col } from 'react-bootstrap'


function Booking() {

    const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
    const token = localStorage.getItem("accessToken");

    // const [data, setData] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);
    let { id } = useParams();
    const price = 300;

    // const [dateFrom, setDateFrom] = useState('');
    // const [dateTo, setDateTo] = useState('');
    const [guests, setGuests] = useState(0);

    const [dateRange, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);

    // VARIABLES FOR CALENDAR
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    // const onChange = (props) => {
    //     const startDate = props.startDate;
    //     const endDate = props.endDate;
    // };

    // CONSTANT FOR CALENDAR BOOKING
    const handleChange = (ranges) => {
        setDate(ranges.selection);
        // setDate({
        //     startDate: date.startDate,
        //     endDate: date.endDate
        // })
        console.log(date);
    }

    const handleClick = () => {
        setOpenDate((prev) => !prev);
    }

    const startDate = dateRange[0].startDate.toISOString().split('T')[0];
    const endDate = dateRange[0].endDate.toISOString().split('T')[0];

    const millisecondsDiff = new Date(date.endDate).getTime() - new Date(date.startDate).getTime();
    const total_seconds = parseInt(Math.floor(millisecondsDiff / 1000));
    const total_minutes = parseInt(Math.floor(total_seconds / 60));
    const total_hours = parseInt(Math.floor(total_minutes / 60));
    const daysDiff = parseInt(Math.floor(total_hours / 24));

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
        // console.log(guests);
        // console.log(typeof(guests));
        // console.log(date.startDate);
        // console.log(date.endDate);

        if (response.ok) {
            console.log('Booking successful!');
            // Reset form after successful booking
            // setDateFrom('');
            // setDateTo('');
            setGuests(0);
        } else {
            console.log('Booking failed!');
            // Handle error
        }
        } catch (error) {
        console.log(error);
        // Handle error
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
              {/* <div className='button-container justify-content-around text-center'> */}
              <span className='calendar w-100 text-center'>
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
                
              
              <span className='calendar' onClick={handleClick}>
              <Row>
                <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Start date"
                    className="mb-3"
                >
                    <Form.Control value={`${format(date.startDate, 'MMM dd yyyy' )}`} className='w-100'/>
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel
                    controlId="floatingInput"
                    label="End date"
                    className="mb-3"
                >
                    <Form.Control value={`${format(date.endDate, 'MMM dd yyyy' )}`} className='w-100'/>
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
                /> }
    
                <FloatingLabel
                  controlId="floatingInput"
                  label="Guests"
                  className="mb-3 w-100"
                >
                  <Form.Control type="number" value={guests} 
                  onChange={(e) => setGuests(e.target.valueAsNumber)}/>
                </FloatingLabel>
    
                <Button className='w-100 mt-3' type="submit">Reserve</Button>
              </Form>
              <p className='float-end mt-3'>{price * daysDiff} kr</p>
              <p className='mt-3'>{price}kr x {daysDiff} nights</p>
              <hr class="hr" />
              <h6 className='float-end'>{price * daysDiff} kr</h6>
              <h6>Total: </h6>
            </div>
    );      
}

export default Booking;


// export function Booking(data) {

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