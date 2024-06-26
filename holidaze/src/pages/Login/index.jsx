import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';

import "../../styles/global.css";


const login_url = 'https://v2.api.noroff.dev/auth/login';

function Login() {
    const schema = yup
    .object({
      email: yup
        .string().email()
        .required('Your email must be @noroff.no'),
      password: yup
        .string()
        .min(3, 'Your password should be at least 3 characters.')
        .max(50, 'Your password cannot be longer than 50 characters.')
        .required('Please enter your password'),
    })
    .required();
  
    const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: yupResolver(schema),
        });
      
        async function loginUser(url, userData) {

          try {
              const postData = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(userData),
              };
      
              const response = await fetch(url, postData);
              const json = await response.json();
      
              if (response.status === 200) {
                  window.location.href = "/";

                  const accessToken = json.data.accessToken;
                  localStorage.setItem("accessToken", accessToken);
    
                  let loggedInUser = json.data.name;
                  localStorage.setItem("loggedInUser", loggedInUser);

              }
            
              else {
                  const errorMessage = document.querySelector('.errorMessage');
                  errorMessage.innerText = "Invalid email or password";
              }

              
      
          } catch (error) {
              console.log(error);
          }
        }

        try {
          const emailInput = document.getElementById("email_input").value;
          const pwdInput = document.getElementById("pwd").value;
        
          let userToLogin = {
            email: emailInput,
            password: pwdInput
          };
      
          loginUser(login_url, userToLogin);
        }

        catch (error) {
          console.log(error);
        }
      
        return (
          <div className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit(loginUser)} className='login-form vh-100 col-sm-8 col-md-6 col-xl-4 mt-3'>
              <h1 className='text-center mt-3 mb-5'>Login</h1>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control {...register('email')} id="email_input" placeholder='Your email address ...' />
                <Form.Text className='text-danger'>{errors.email?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control {...register('password')} id="pwd" type="password" placeholder='Your password ...' />
                <Form.Text className='text-danger'>{errors.password?.message}</Form.Text>
              </Form.Group>

              <p className='errorMessage text-danger'></p>
  
              <Button className='primary-button mt-3' type="submit">
                Submit
              </Button>
              
            </Form>
          </div>
        );
}

export default Login;