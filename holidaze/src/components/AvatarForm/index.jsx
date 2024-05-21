import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import "../../styles/global.css";

import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';

const name = localStorage.getItem("loggedInUser");
console.log(name);

const register_url = `https://v2.api.noroff.dev/holidaze/profiles/${name}`;
const success_message = document.getElementsByClassName("register-success");
const error_message = document.getElementsByClassName("error-message");


const apiKey = '795d7f87-c437-4950-bc0a-f262a0b473a9';
const token = localStorage.getItem("accessToken");


function UpdateAvatar() {


const schema = yup
.object({
  avatar: yup
    .string().url()
    .required('Please enter valid Image URL'),
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

      async function updateAvatarURL(url, userData) {

        try {
            const postData = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    "X-Noroff-API-Key": apiKey
                },
                body: JSON.stringify(userData),
            };
    
            const response = await fetch(url, postData);
            console.log(response);
            const json = await response.json();
            console.log(json);
    
            if (response.status === 200) {
                console.log("Avatar changed");
                success_message[0].innerText = "Update successfull!";
            }
          
            else {
                console.log("Update failed!");
                error_message[0].innerText = "Register failed!";
            }
    
        } catch (error) {
            console.log(error);
        }
      }

      console.log(data.avatar);
  
          try {
  
              let user = {
                  avatar: {url: data.avatar}
              };
  
              updateAvatarURL(register_url, user);

          }
  
          catch(error) {
              console.log(error);
          }
    }

return (
    <Form onSubmit={handleSubmit(onSubmit)}>

    <Form.Group className="mb-3">
        <Form.Label htmlFor="avatar">Avatar</Form.Label>
        <Form.Control {...register('avatar')} placeholder='Fill in valid image URL ...'/>
        <Form.Text className='text-danger'>{errors.avatar?.message}</Form.Text>
    </Form.Group>

    <Form.Text className='register-success text-success'></Form.Text>
    <Form.Text className='error_message text-danger'></Form.Text>

    <Button className='primary-button mt-3' type="submit">
      Save changes
    </Button>
    
  </Form>
)

}

export default UpdateAvatar;