import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Cartcontext } from '../../context/context';
// import "./singleProduct.css";


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

  return (
    <div className='vh-100 w-50'>
    <div className='mt-5 d-flex justify-content-center'>
        <div className='m-2'>
        <div key={item.id}>
        <h5 className='mt-2'>{item.name}</h5>
          <img src={item.media[0].url} alt={item.name}className='w-100'></img>
          <div className='card-body p-3'>
            <h6>{item.location.city}, {item.location.country}</h6>
            <p>{item.maxGuests} guests</p>
            <p>{item.description}</p>
            <div>
            <img src={item.owner.avatar.url} alt={item.owner.name}className='w-25 rounded-circle'></img>
            <p>published by <br />{item.owner.name}</p>
            </div>
           
            <p>{item.rating}/5&#9733; </p>
            <h6></h6>
            {/* <button onClick={() => dispatch({type: 'ADD', payload: item })} className='btn btn-outline-secondary mb-3 float-end'>Add to cart</button> */}
          </div>
        </div>
        </div>
    </div>
    </div>
  );
}

export default Venue;