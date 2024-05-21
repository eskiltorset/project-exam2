import { MDBFooter } from 'mdb-react-ui-kit';
import React from 'react';
import "../../styles/global.css";


// Our footer component that gets used in our <Layout> component
function Footer() {

    return (
      <MDBFooter className='text-center text-lg-left bottom-0 w-100 bg-footer mt-5'>
      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Holidaze{' '}
      </div>
    </MDBFooter>
    );
}

export default Footer;