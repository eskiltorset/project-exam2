import { Routes, Route, Outlet } from "react-router-dom";
import React from 'react';
// import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import Products from "./pages/Products";
// import Product from "./pages/SingleProduct";
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
          {/* <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<Product />} /> */}
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  )
} 

export default App;