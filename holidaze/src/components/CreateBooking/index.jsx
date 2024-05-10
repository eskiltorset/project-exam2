import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



// function Booking() {

//     const schema = yup
//     .object({
//     dateFrom: yup
//     .string()
//     .min(2, 'Your name should be at least 2 characters.')
//     .max(50, 'Your name cannot be longer than 20 characters.')
//     .required('Please enter the startdate'),
//     dateTo: yup
//         .string()
//         .required('Please enter the endDate.'),
//     guests: yup
//         .number()
//         .required('Your max guest should be between 1-20 people'),
//     })
//     .required();

//     const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     } = useForm({
//     resolver: yupResolver(schema),
//     });

// }

export function Booking(data) {

    const createBooking_URL = 'https://v2.api.noroff.dev/holidaze/bookings';
const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';

    let { id } = useParams();

    console.log(data);
    const token = localStorage.getItem("accessToken");

    async function CreateBooking(url, bookingData) {

    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": apiKey
            },
            body: JSON.stringify(bookingData),
        };

        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);

        if (response.status === 200) {
            console.log("Booking successful!");
            
        }
        
        else {
            console.log("Booking failed!");
        }

    } catch (error) {
        console.log(error);
        // console.log(error_message);
    }
    }

        try {

        console.log(data);
        console.log(id);

            let booking = {
                venueId: data.id,            
                dateFrom: data.dateFrom,
                dateTo: data.dateTo,
                guests: data.guests
            };

            CreateBooking(`${createBooking_URL}`, booking);

        }

        catch(error) {
            console.log(error);
        }
}

export default Booking;