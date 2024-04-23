import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';

const register_url = 'https://v2.api.noroff.dev/auth/register';
const error_message = document.getElementsByClassName("error-message");
const success_message = document.getElementsByClassName("register-success");
console.log(error_message);
console.log(success_message);


// ^[\w\-.]+@(stud\.)?noroff\.no$

function Register() {
    const schema = yup
    .object({
      username: yup
      .string()
      .min(2, 'Your password should be at least 2 characters.')
      .max(20, 'Your password cannot be longer than 20 characters.')
      .required('Please enter your username'),
      email: yup
        .string().email('^[\w\-.]+@(stud\.)?noroff\.no$')
        // .validate("@stud.noroff.no")
        .required('Your email must be @stud.noroff.no'),
      password: yup
        .string()
        .min(8, 'Your password should be at least 8 characters.')
        .max(50, 'Your password cannot be longer than 50 characters.')
        .required('Please enter your password'),
      avatar: yup
        .string().url()
        // .required('Please enter valid URL'),
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
                    console.log("Register successful!");
                    success_message[0].innerText = "Register successfull!";
                    window.location.reload();
                }
              
                else {
                    console.log("Register failed!");
                }
        
            } catch (error) {
                console.log(error);
                console.log(error_message);
            }
          }
      
              try {
      
                  let user = {
                      name: data.username,
                      email: data.email,
                      password: data.password,
                      avatar: data.avatar.url,
                      venueManager: data.radio.value
                  };
      
                  registerUser(register_url, user);

              }
      
              catch(error) {
                  console.log(error);
              }
        }

        // let emailInput = document.getElementById("email_input").value;
        // let pwdInput = document.getElementById("password_input").value;
        // let avatarInput = document.getElementById("avatar_input").value;
        // console.log(emailInput, pwdInput, avatarInput);
      
        return (
          <div className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit(onSubmit)} className='vh-100 w-50 mt-3' id="registerForm">
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
                <Form.Control {...register('password')} placeholder='Your password ...'/>
                <Form.Text className='text-danger'>{errors.password?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="avatar">Avatar</Form.Label>
                <Form.Control {...register('avatar')} placeholder='Fill in valid image URL ...'/>
                <Form.Text className='text-danger'>{errors.avatar?.message}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label>Choose type of user</Form.Label>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Customer"
                      name="customer"
                      value="false"
                      type={type}
                      // checked={this.state.selectedOption === "false"}
                      id={`inline-${type}-customer`}
                    />
                    <Form.Check
                      inline
                      label="Venue Manager"
                      name="manager"
                      value="true"
                      type={type}
                      // checked={this.state.selectedOption === "true"}
                      id={`inline-${type}-manager`}
                    />
                  </div>
                ))}
              </Form.Group>

              <Form.Text className='register-success text-success'></Form.Text>
  
              <Button variant="secondary" className='w-100 mt-2' type="submit">
                Register
              </Button>
              
            </Form>
          </div>
        );
}

export default Register;