import { parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";

const RentingTable = ({ rentingInfo, handleRentingCancellation }) => {
  const [filteredRentings, setFilteredRentings] = useState(rentingInfo);

  const filterBooknigs = (startDate, endDate) => {
    if (startDate && endDate) {
      const filtered = rentingInfo.filter((booking) => {
        const rentingStartDate = parseISO(booking.checkInDate);
        const rentingEndDate = parseISO(booking.checkOutDate);
        return (
          rentingStartDate >= startDate &&
          rentingEndDate <= endDate &&
          rentingEndDate > startDate
        );
      });
      setFilteredRentings(filtered);
    } else {
      setFilteredRentings(rentingInfo);
    }
  };

  useEffect(() => {
    setFilteredRentings(rentingInfo);
  }, [rentingInfo]);

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBooknigs}
        onFilterChange={filterBooknigs}
      />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>Index</th>
            <th>Customer Name </th>
            <th>Email </th>
            <th>Check In Date</th>
            <th>Check Out Date </th>
            <th>Console Name</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredRentings.map((renting, index) => (
            <tr key={renting.rentingId}>
              <td>{index + 1}</td>
              <td>{renting.customerFullName}</td>
              <td>{renting.customerEmail}</td>
              <td>{renting.checkInDate}</td>
              <td>{renting.checkOutDate}</td>
              <td>{renting.console.consoleName}</td>
              <td>{renting.rentingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRentingCancellation(renting.rentingId)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredRentings.length === 0 && (
        <p> No order found for the selected dates</p>
      )}
    </section>
  );
};

export default RentingTable;
