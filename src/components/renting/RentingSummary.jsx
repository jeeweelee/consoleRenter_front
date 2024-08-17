import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';

const RentingSummary = ({ renting, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(renting.checkInDate);
  const checkOutDate = moment(renting.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, 'days');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleConfirmRenting = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      onConfirm(); 
    }, 3000);
  };

  return (
    <div className="card card-body mt-5">
      <h4>Purchase Summary</h4>
      <p>Full Name: <strong>{renting.customerFullName}</strong></p>
      <p>Email: <strong>{renting.customerEmail}</strong></p>
      <p>Check In Date: <strong>{moment(renting.checkInDate).format('MMM Do YYYY')}</strong></p>
      <p>Check Out Date: <strong>{moment(renting.checkOutDate).format('MMM Do YYYY')}</strong></p>
      <p>Number of Days: <strong>{numberOfDays}</strong></p>
      {payment > 0 ? (
        <>
          <p>Total Payment: <strong>${payment}</strong></p>
          {isFormValid ? (
            <Button variant="success" onClick={handleConfirmRenting}>
              {isProcessingPayment ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Processing Payment...
                </>
              ) : (
                'Confirm Renting and Proceed to Payment'
              )}
            </Button>
          ) : null}
        </>
      ) : (
        <p className="text-danger">Check-out Date must be after check-in date</p>
      )}
    </div>
  );
};

export default RentingSummary;
