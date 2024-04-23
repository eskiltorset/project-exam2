import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';

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
              console.log(response);
              const json = await response.json();
              console.log(json);
      
              if (response.status === 200) {
                  console.log("Login successful!");
                  window.location.href = "/venues";
                  // success_message[0].innerText = "Register successfull!";
                  // window.location.reload();
              }
            
              else {
                  console.log("Login failed!");
              }

              const accessToken = json.accessToken;
              localStorage.setItem("accessToken", accessToken);

              let loggedInUser = json.name;
              localStorage.setItem("loggedInUser", loggedInUser);
              console.log(`Name: ${localStorage.getItem("loggedInUser")}`);
      
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
            <Form onSubmit={handleSubmit(loginUser)} className='vh-100 w-50 mt-3'>
              <h1 className='text-center mt-3 mb-5'>Login</h1>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control {...register('email')} id="email_input" placeholder='Your email address ...' />
                <Form.Text className='text-danger'>{errors.email?.message}</Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control {...register('password')} id="pwd" placeholder='Your password ...' />
                <Form.Text className='text-danger'>{errors.password?.message}</Form.Text>
              </Form.Group>
  
              <Button variant="secondary" type="submit">
                Submit
              </Button>
              
            </Form>
          </div>
        );
}

export default Login;