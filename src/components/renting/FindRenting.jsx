import React, { useState } from "react";
import moment from "moment";
import {
  cancelRenting,
  getRentingByConfirmationCode,
} from "../utils/ApiFunctions";

const FindRenting = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rentingInfo, setRentingInfo] = useState({
    rentingId: "",
    rentingConfirmationCode: "",
    console: { consoleName: "", consoleType: "" },
    checkInDate: "",
    checkOutDate: "",
    customerFullName: "",
    customerEmail: "",
  });

  const emptyRentingInfo = {
    rentingId: "",
    rentingConfirmationCode: "",
    console: { consoleName: "", consoleType: "" },
    checkInDate: "",
    checkOutDate: "",
    customerFullName: "",
    customerEmail: "",
  };
  const [isDeleted, setIsDeleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await getRentingByConfirmationCode(confirmationCode);
      setRentingInfo(data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setRentingInfo(emptyRentingInfo);
      if (error.response && error.response.status === 404) {
        setError("Renting not found. Please check your confirmation code.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleRentingCancellation = async () => {
    try {
      await cancelRenting(rentingInfo.rentingId);
      setIsDeleted(true);
      setSuccessMessage("Renting has been cancelled successfully!");
      setRentingInfo(emptyRentingInfo);
      setConfirmationCode("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 1000);
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">Find My Renting</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the renting confirmation code"
            />

            <button type="submit" className="btn btn-store input-group-text">
              Find renting
            </button>
          </div>
        </form>

        {isLoading ? (
          <div>Finding your renting...</div>
        ) : error ? (
          <div className="text-danger">Error: {error}</div>
        ) : rentingInfo.rentingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Renting Information</h3>
            <p className="text-success">
              Confirmation Code: {rentingInfo.rentingConfirmationCode}
            </p>
            <p>Renting Id: {rentingInfo.rentingId}</p>
            <p>Console : {rentingInfo.console.consoleName}</p>
            <p>
              Check-in Date:{" "}
              {moment(rentingInfo.checkInDate).format("MMM Do, YYYY")}
            </p>
            <p>
              Check-out Date:{" "}
              {moment(rentingInfo.checkOutDate).format("MMM Do, YYYY")}
            </p>
            <p>Full Name: {rentingInfo.customerFullName}</p>
            <p>Email Address: {rentingInfo.customerEmail}</p>

            {!isDeleted && (
              <button
                onClick={handleRentingCancellation}
                className="btn btn-danger"
              >
                Cancel Renting
              </button>
            )}
          </div>
        ) : (
          <div>find renting...</div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3 fade show">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FindRenting;
