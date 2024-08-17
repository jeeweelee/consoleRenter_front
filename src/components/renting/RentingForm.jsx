import React, { useState, useEffect } from 'react';
import { getConsoleById, rentConsole } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, FormControl, Button } from 'react-bootstrap';
import RentingSummary from './RentingSummary';

const RentingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [consolePrice, setConsolePrice] = useState(0);
  const [consoleDetails, setConsoleDetails] = useState(null);
  const [renting, setRenting] = useState({
    customerFullName: '',
    customerEmail: '',
    checkInDate: '',
    checkOutDate: '',
    numOfDays: '',
  });
  const { consoleId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRenting({ ...renting, [name]: value });
    setErrorMessage('');
  };

  const fetchConsoleDetails = async (consoleId) => {
    try {
      const response = await getConsoleById(consoleId);
      setConsoleDetails(response);
      setConsolePrice(response.consolePrice);
    } catch (error) {
      console.error('Error fetching console details:', error);
      setErrorMessage('Failed to fetch console details.');
    }
  };

  useEffect(() => {
    fetchConsoleDetails(consoleId);
  }, [consoleId]);

  const calculatePayment = () => {
    const checkInDate = moment(renting.checkInDate);
    const checkOutDate = moment(renting.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const price = consolePrice ? consolePrice : 0;
    return diffInDays * price;
  };

  const isCheckOutDateValid = () => {
    if (!moment(renting.checkOutDate).isSameOrAfter(moment(renting.checkInDate))) {
      setErrorMessage('Check Out Date must be after Check In date');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleRenting = async () => {
    try {
      const confirmationCode = await rentConsole(consoleId, renting);
      navigate("/renting-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/renting-success", { state: { error: errorMessage } });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title mb-5">Rent Console</h4>
            {consoleDetails && (
              <>
                <div className="d-flex justify-content-center">
                  <img
                    src={`data:image/png;base64,${consoleDetails.photo}`}
                    alt={`${consoleDetails.consoleType} Photo`}
                    className="img-fluid"
                    style={{ maxWidth: '200px', height: 'auto' }}
                  />
                </div>
                <h5 className="store-color mt-3 text-center">{consoleDetails.consoleType}</h5>
                <h6 className="console-price mt-3 text-center"> ${consoleDetails.consolePrice} / Day</h6>
              </>
            )}
            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="customerFullName">Full Name:</Form.Label>
                <FormControl
                  required
                  type="text"
                  id="customerFullName"
                  name="customerFullName"
                  value={renting.customerFullName}
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your full name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="customerEmail">Email:</Form.Label>
                <FormControl
                  required
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={renting.customerEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your email
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: '2px' }}>
                <legend>Time</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate">Check-In:</Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={renting.checkInDate}
                      placeholder="Check-In Date"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a date
                    </Form.Control.Feedback>
                  </div>

                  <div className="col-6">
                    <Form.Label htmlFor="checkOutDate">Check-Out:</Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={renting.checkOutDate}
                      placeholder="Check-Out Date"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a date
                    </Form.Control.Feedback>
                  </div>
                </div>
              </fieldset>

              <Button type="submit" className="mt-3">Submit</Button>
            </Form>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </div>
        </div>
        {isSubmitted && (
          <div className="col-md-6">
            <RentingSummary
              renting={renting}
              payment={calculatePayment()}
              isFormValid={isValidated}
              onConfirm={handleRenting}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RentingForm;


