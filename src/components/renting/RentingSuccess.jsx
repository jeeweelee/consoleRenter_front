import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';

const RentingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;

  return (
    <div className="container">
      <Header title="Renting Success" />
      <div className="mt-5">
        {message ? (
          <div>
            <h3 className="text-success">Renting Success!</h3>
            <p className="text-success">Confirmation Code: {message}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-danger">Error Renting Console!</h3>
            <p className="text-danger">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentingSuccess;
