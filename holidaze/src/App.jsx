import { Routes, Route, Outlet } from "react-router-dom";
import React from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Venues from "./pages/Venues";
import CreateVenue from "./pages/CreateVenue";
import Update from "./components/Update";
import Venue from "./pages/SingleVenue";
import Profile from "./pages/Profile";
import SignOut from "./components/SignOut";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";

// function Home() {
//   return <div className='vh-100'>Home</div>
// }

function RouteNotFound() {
  return <div>Page not found</div>
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Venues />} /> */}
          <Route path="create-venue" element={<CreateVenue />} />
          <Route path="edit/:id" element={<Update />} />
          <Route path="venues" element={<Venues />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="login" element={<SignOut />} /> */}

          {/* <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} /> */}
          <Route path="venue/:id" element={<Venue />} />
          <Route path="profile/:name" element={<Profile />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  )
} 

export default App;