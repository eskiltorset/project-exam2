import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
      if(event.target.value === ''){
        return(<div>empty.</div>)
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(searchTerm);
    };
  
    return (
        <Form className="d-flex justify-content-center mb-3" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="w-50 mb-3"
              aria-label="Search"
              value={searchTerm}
              onChange={handleChange}
            />
            <Button className='primary-button-outline mb-3' type="submit">Search</Button>
        </Form>
    );
  };
  
  export default SearchBar;