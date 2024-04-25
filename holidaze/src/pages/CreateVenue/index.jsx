import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';

const createVenue_url = 'https://v2.api.noroff.dev/holidaze/venues';
// const apiKey = 'https://v2.api.noroff.dev/auth/create-api-key';

export const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
// const error_message = document.getElementsByClassName("error-message");
const success_message = document.getElementsByClassName("register-success");
// console.log(error_message);
// console.log(success_message);


// ^[\w\-.]+@(stud\.)?noroff\.no$

function CreateVenue() {

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
        .min(4, 'Your city should be at least 4 characters.')
        .max(4, 'Your city cannot be longer than 4 characters.'),
        // .required('Your description must be @stud.noroff.no'),
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

        // async function registerKey(url, keyData){

        // try {
        //     const postKey = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: JSON.stringify(keyData),
        //     };            
            
        //     const response = await fetch(url, postKey);
        //     console.log(response);
        //     const json = await response.json();
        //     console.log(json);

        //     console.log(json.data.key)
        //     const storeApiKey = json.data.key;
        //     localStorage.setItem("apiKey", storeApiKey);
        // }

        // catch (error) {
        //     console.log(error);
        // }

        // }

        // let key  = {
        // name: "Venue Key",
        // };
    
        // registerKey(apiKey, key);

        // console.log(key);

        async function registerVenue(url, venueData) {
        
        // const apiKeyLS = localStorage.getItem(apiKeyLS);
        // console.log(apiKeyLS);

        try {
            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": apiKey
                },
                body: JSON.stringify(venueData),
            };
    
            const response = await fetch(url, postData);
            console.log(response);
            const json = await response.json();
            console.log(json);
    
            if (response.status === 201) {
                console.log("Venue creation successful!");
                success_message[0].innerText = "Register successfull!";
                
            }
            
            else {
                console.log("Register failed!");
            }
    
        } catch (error) {
            console.log(error);
            // console.log(error_message);
        }
        }
    
            try {
    
                let venue = {
                    name: data.name,
                    description: data.description,
                    location: { city: data.city,
                      zip: data.zip,
                      country: data.country},
                    media: data.media.url,
                    maxGuests: data.maxGuests,
                    price: data.price
                    
                };
    
                registerVenue(createVenue_url, venue);

            }
    
            catch(error) {
                console.log(error);
            }
        }

      
        return (
          <div className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit(onSubmit)} className='vh-100 w-50 mt-3' id="registerForm">
              <h1 className='text-center mt-3 mb-5'>Create a Venue</h1>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Title</Form.Label>
                <Form.Control {...register('name')} placeholder='Your name ...'/>
                <Form.Text className='text-danger error-message'>{errors.name?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control {...register('description')} placeholder='Your description address ...'/>
                <Form.Text className='text-danger'>{errors.description?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3 w-50 display-inline-block">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control {...register('city')} placeholder='Your city ...'/>
                <Form.Text className='text-danger'>{errors.city?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3 w-50 display-inline-block">
                <Form.Label htmlFor="zip">Zip</Form.Label>
                <Form.Control {...register('zip')} placeholder='Fill in valid image URL ...'/>
                <Form.Text className='text-danger'>{errors.zip?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="country">Country</Form.Label>
                <Form.Control {...register('country')} placeholder='Your country ...'/>
                <Form.Text className='text-danger error-message'>{errors.country?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="media">Media</Form.Label>
                <Form.Control {...register('media')} placeholder='Your media address ...'/>
                <Form.Text className='text-danger'>{errors.media?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3 w-50 display-inline-block">
                <Form.Label htmlFor="maxGuests">Max Guests</Form.Label>
                <Form.Control {...register('maxGuests')} placeholder='Your maxGuests ...'/>
                <Form.Text className='text-danger'>{errors.maxGuests?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3 w-50 display-inline-block">
                <Form.Label htmlFor="price">price</Form.Label>
                <Form.Control {...register('price')} placeholder='Fill in price ...'/>
                <Form.Text className='text-danger'>{errors.price?.message}</Form.Text>
              </Form.Group>

              <Form.Text className='register-success text-success'></Form.Text>
  
              <Button variant="secondary" className='w-100 mt-2' type="submit">
                Create venue
              </Button>
              
            </Form>
          </div>
        );
}

export default CreateVenue;