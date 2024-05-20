import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(searchTerm);
    };

    console.log(searchTerm);
  
    return (
        <Form className="d-flex justify-content-center mb-3" onSubmit={handleSubmit}>
            <Form.Control
            type="search"
            placeholder="Search"
            className="w-50"
            aria-label="Search"
            value={searchTerm}
            onChange={handleChange}
            />
            <Button variant="outline-dark" type="submit">Search</Button>
        </Form>
    );
  };
  
  export default SearchBar;