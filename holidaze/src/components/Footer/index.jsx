import { MDBFooter } from 'mdb-react-ui-kit';
import React from 'react';

// Our footer component that gets used in our <Layout> component
function Footer() {

    return (
      <MDBFooter className='text-center text-lg-left bottom-0 w-100 bg-body-tertiary mt-3'>
      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} ECommerce Store{' '}
      </div>
    </MDBFooter>
    );
}

export default Footer;