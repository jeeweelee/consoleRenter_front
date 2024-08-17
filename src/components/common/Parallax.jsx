import React from 'react';
import { Container } from 'react-bootstrap';


const Parallax = () => {
  
  const locations = [
    { id: 1, name: 'Dodge Road 123, Example City, State, Zip Code' },
    { id: 2, name: 'Main Street 456, Another City, State, Zip Code' },
    { id: 3, name: 'Broadway Avenue 789, Yet Another City, State, Zip Code' },
  ];

  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
          <h1>
            <span className="store-color">Jia's Console Renter</span>
          </h1>
          <h3>Locations:</h3>
          <ul>
            {locations.map(location => (
              <li key={location.id}>{location.name}</li>
            ))}
          </ul>

        </div>
      </Container>
    </div>
  );
}

export default Parallax;
