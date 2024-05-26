import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useState } from 'react';

import "../../styles/global.css";

const register_url = 'https://v2.api.noroff.dev/auth/register';
// const error_message = document.getElementsByClassName("error-message");
const error_message_submit = document.getElementsByClassName("error-message-submit");
const success_message = document.getElementsByClassName("register-success");

function Register() {

  let [role, setRole] = useState();
  console.log(role);

    const schema = yup
    .object({
      username: yup
      .string()
      .min(2, 'Your password should be at least 2 characters.')
      .max(20, 'Your password cannot be longer than 20 characters.')
      .required('Please enter your username'),
      email: yup
        .string().email()
        .matches(/^[\w\-.]+@(stud\.)?noroff\.no$/, "Your email must be @stud.noroff.no/@noroff.no")
        .required('Your email must be @stud.noroff.no'),
      password: yup
        .string()
        .min(8, 'Your password should be at least 8 characters.')
        .max(50, 'Your password cannot be longer than 50 characters.')
        .required('Please enter your password'),
      avatar: yup
        .string().url()
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

          async function registerUser(url, userData) {

            try {
                const postData = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                };
        
                const response = await fetch(url, postData);
                console.log(response);
                const json = await response.json();
                console.log(json);
        
                if (response.status === 201) {
                    success_message[0].innerText = "Register successfull!";
                    error_message_submit[0].innerText = '';
                }
              
                else {
                    console.log("Register failed!");
                    error_message_submit[0].innerText = json.errors[0].message;
                    success_message[0].innerText = '';
                }
        
            } catch (error) {
                console.log(error);
            }
          }
      
              try {

                console.log(role);
                if(role == "venueManager"){
                  role = true;
                }

                else{
                  role = false;
                }
      
                  let user = {
                      name: data.username,
                      email: data.email,
                      password: data.password,
                      avatar: data.avatar.url,
                      venueManager: role
                  };
      
                  registerUser(register_url, user);

              }
      
              catch(error) {
                  console.log(error);
                  error_message_submit[0].innerText = error.errors.errors;
              }
        }
      
        return (
          <div className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit(onSubmit)} className='vh-100 register-form col-sm-8 col-md-6 col-xl-4 mt-3' id="registerForm">
              <h1 className='text-center mt-3 mb-5'>Register</h1>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control {...register('username')} placeholder='Your username ...'/>
                <Form.Text className='text-danger error-message'>{errors.username?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control {...register('email')} placeholder='Your email address ...'/>
                <Form.Text className='text-danger'>{errors.email?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control {...register('password')} type="password" placeholder='Your password ...'/>
                <Form.Text className='text-danger'>{errors.password?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="avatar">Avatar</Form.Label>
                <Form.Control {...register('avatar')} placeholder='Fill in valid image URL ...'/>
                <Form.Text className='text-danger'>{errors.avatar?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label>Choose type of user</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Customer"
                        name="role"
                        value="customer"   
                        onChange={e => setRole(e.target.value)} 
                    />
                    <Form.Check
                        type="radio"
                        label="Venue Manager"
                        name="role"
                        value="venueManager"
                        onChange={e => setRole(e.target.value)}
                    />
              </Form.Group>

              <Form.Text className='register-success text-success'></Form.Text>
              <Form.Text className='error-message-submit text-danger'></Form.Text>
  
              <Button className='primary-button' type="submit">
                Register
              </Button>
              
            </Form>
          </div>
        );
}

export default Register;