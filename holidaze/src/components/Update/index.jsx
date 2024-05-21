import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Row, Col } from 'react-bootstrap'
import "../../styles/global.css";

const updateVenue_URL = 'https://v2.api.noroff.dev/holidaze/venues';
export const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
const success_message = document.getElementsByClassName("register-success");

function Update(){
    const { id } = useParams();

    const schema = yup
    .object({
      name: yup
      .string()
      .min(2, 'Your name should be at least 2 characters.')
      .max(50, 'Your name cannot be longer than 20 characters.')
      .required('Please enter your name'),
      description: yup
        .string()
        .required('You need a description of your venue.'),
      city: yup
        .string()
        .min(2, 'Your city should be at least 8 characters.')
        .max(25, 'Your city cannot be longer than 50 characters.'),
        // .required('Please enter your city'),
      zip: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(4, 'Must be exactly 4 digits')
        .max(4, 'Must be exactly 4 digits'),
      city: yup
        .string()
        .min(2, 'Your city should be at least 2 characters.')
        .max(25, 'Your city cannot be longer than 25 characters.'),
        // .required('Please enter your city'),
      media: yup
        .string().url()
        .required('Please enter valid URL'),
      maxGuests: yup
        .number()
        .required('Your max guest should be between 1-20 people'),
      price: yup
        .number()
        .required('Your venue needs a price per night'),
    })
    .required();
  
    const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: yupResolver(schema),
        });
      
        function onSubmit(data) {
        console.log(data);
        const token = localStorage.getItem("accessToken");

        async function UpdateVenue(url, newFormData) {

        try {
            const postData = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": apiKey
                },
                body: JSON.stringify(newFormData),
            };
    
            const response = await fetch(url, postData);
            console.log(response);
            const json = await response.json();
            console.log(json);
    
            if (response.status === 200) {
                console.log("Venue creation successful!");
                success_message[0].innerText = "Venue is updated!";

                setTimeout(() => {
                    window.location.href = `/venue/${id}`;
                  }, 2000);
                
            }
            
            else {
                console.log("Update failed!");
            }
    
        } catch (error) {
            console.log(error);
        }
        }
    
            try {
    
                let venue = {
                    name: data.name,
                    description: data.description,
                    location: { 
                        city: data.city,
                        zip: data.zip,
                        country: data.country
                    },
                    media: data.media.url,
                    maxGuests: data.maxGuests,
                    price: data.price
                    
                };
    
                UpdateVenue(`${updateVenue_URL}/${id}`, venue);

            }
    
            catch(error) {
                console.log(error);
            }
        }

        return (
            <div className='d-flex justify-content-center'>
              <Form onSubmit={handleSubmit(onSubmit)} className='vh-100 col-sm-8 col-md-6 col-xl-5 mt-3' id="registerForm">
                <h1 className='text-center mt-3 mb-5'>Update a Venue</h1>
  
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name">Title</Form.Label>
                  <Form.Control {...register('name')} placeholder='Your name ...'/>
                  <Form.Text className='text-danger error-message'>{errors.name?.message}</Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <Form.Control {...register('description')} as="textarea" placeholder='Your description address ...'/>
                  <Form.Text className='text-danger'>{errors.description?.message}</Form.Text>
                </Form.Group>
                <Row>
                  <Form.Group className="mb-3 w-50 display-inline-block">
                    <Form.Label htmlFor="city">City</Form.Label>
                    <Form.Control {...register('city')} placeholder='Your city ...'/>
                    <Form.Text className='text-danger'>{errors.city?.message}</Form.Text>
                  </Form.Group>
      
                  <Form.Group className="mb-3 w-50 display-inline-block">
                    <Form.Label htmlFor="zip">Zip</Form.Label>
                    <Form.Control {...register('zip')} placeholder='Ex. 1234'/>
                    <Form.Text className='text-danger'>{errors.zip?.message}</Form.Text>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="country">Country</Form.Label>
                  <Form.Control {...register('country')} placeholder='Your country ...'/>
                  <Form.Text className='text-danger error-message'>{errors.country?.message}</Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="media">Media</Form.Label>
                  <Form.Control {...register('media')} placeholder='Your media URL address ...'/>
                  <Form.Text className='text-danger'>{errors.media?.message}</Form.Text>
                </Form.Group>
    
                <Row>
                  <Form.Group className="mb-3 w-50 display-inline-block">
                    <Form.Label htmlFor="maxGuests">Max Guests</Form.Label>
                    <Form.Control {...register('maxGuests')} placeholder='Your max guests ...'/>
                    <Form.Text className='text-danger'>{errors.maxGuests?.message}</Form.Text>
                  </Form.Group>
      
                  <Form.Group className="mb-3 w-50 display-inline-block">
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control {...register('price')} placeholder='Fill in price ...'/>
                    <Form.Text className='text-danger'>{errors.price?.message}</Form.Text>
                  </Form.Group>
                </Row>
                <Form.Text className='register-success text-success'></Form.Text>
    
                <Button className='primary-button mt-3' type="submit">
                  Update venue
                </Button>
                
              </Form>
            </div>
          );
  }

  export default Update;

    