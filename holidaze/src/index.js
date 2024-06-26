import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { Context } from './context/context';
// ...imports above

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    {/* <Context> */}
      <App />
    {/* </Context> */}
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();