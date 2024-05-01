import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Cartcontext } from '../../context/context';
// import "./singleProduct.css";
import "./singleVenue.css";
import DateRangePicker from '@mui/lab/DateRangePicker';




function Venue() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`);
  }, [id]);
//   const Gloablstate = useContext(Cartcontext);
//   const dispatch = Gloablstate.dispatch;
//   console.log(Gloablstate); 

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);

  const item = data.data;
  item.quantity = 1;

//   const price = document.getElementsByClassName('venuePrice');
//   const discount = item.price - item.discountedPrice;
//   const discountPercentage = (discount / item.price) * 100; 
//   console.log(discountPercentage);
  
//   if(item.price != item.discountedPrice){

//     price.innerText = `${item.discountedPrice},-`;
//   }

//   else{
//     price.innerText = `${item.price},-`;
//   }

if (item.owner.name == localStorage.getItem("loggedInUser")){
  return (
    <div className='vh-100 container row justify-content-center mt-3 col-lg-12'>
      <div className='left-content d-flex item-div col-lg-7'>
          <div className='m-2 w-100'>
          <div key={item.id}>
          <h5 className='mt-2'>{item.name}</h5>
            <img src={item.media[0].url} alt={item.name}className='w-100'></img>
            <div className='card-body p-3'>
              <p className='float-end'>{item.rating}/5&#9733; </p>
              <h6>{item.location.city}, {item.location.country}</h6>
              <p>{item.maxGuests} guests</p>
              <p>{item.description}</p>
              <div className='avatar-container'>
                <small>published by<br/></small>
                <img src={item.owner.avatar.url} alt={item.owner.name}className='rounded-circle'></img>
                <small><b>{item.owner.name}</b></small>
              </div>
              {/* <button onClick={() => dispatch({type: 'ADD', payload: item })} className='btn btn-outline-secondary mb-3 float-end'>Add to cart</button> */}
            </div>
          </div>
          </div>
      </div>
      <div className='right-content col-lg-5 mt-5'>
        <div className='w-100 h-auto border p-3'>
          <h5>{item.price}kr pr night</h5>
          <hr class="hr" />
          <div className='button-container justify-content-around'>
            <button className='col-sm-5'>Edit Venue</button>
            <button className='col-sm-5 float-end'>Delete Venue</button>
            <button className='w-100 mt-3'>View Bookings</button>
          </div>
        </div>

      </div>
    </div>
  );
}

else {
  return (
    <div className='vh-100 container row justify-content-center mt-3 col-lg-12'>
      <div className='left-content d-flex item-div col-lg-7'>
          <div className='m-2 w-100'>
          <div key={item.id}>
          <h5 className='mt-2'>{item.name}</h5>
            <img src={item.media[0].url} alt={item.name}className='w-100'></img>
            <div className='card-body p-3'>
              <p className='float-end'>{item.rating}/5&#9733; </p>
              <h6>{item.location.city}, {item.location.country}</h6>
              <p>{item.maxGuests} guests</p>
              <p>{item.description}</p>
              <div className='avatar-container'>
                <small>published by<br/></small>
                <img src={item.owner.avatar.url} alt={item.owner.name}className='rounded-circle'></img>
                <small><b>{item.owner.name}</b></small>
              </div>
              {/* <button onClick={() => dispatch({type: 'ADD', payload: item })} className='btn btn-outline-secondary mb-3 float-end'>Add to cart</button> */}
            </div>
          </div>
          </div>
      </div>
      <div className='right-content col-lg-5 mt-5'>
        <div className='w-100 h-auto border p-3'>
          <h5>{item.price}kr pr night</h5>
          <hr class="hr" />
          <div className='button-container justify-content-around'>
          <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            <button className='w-100 mt-3'>Reserve</button>
          </div>
        </div>

      </div>
    </div>
  );
}

  
}

export default Venue;