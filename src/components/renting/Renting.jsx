import React, { useState, useEffect } from "react";
import { cancelRenting, getAllRentings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import RentingTable from "./RentingTable";

const Renting = () => {
  const [rentingInfo, setRentingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getAllRentings()
        .then((data) => {
          setRentingInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }, 500);
  }, []);

  const handleRentingCancellation = async (rentingId) => {
    try {
      await cancelRenting(rentingId);
      const data = await getAllRentings();
      setRentingInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Orders"} />
      {error && <div className="text-danger">{error}</div>}
      {isLoading ? (
        <div>Loading existing renting</div>
      ) : (
        <RentingTable
          rentingInfo={rentingInfo}
          handleRentingCancellation={handleRentingCancellation}
        />
      )}
    </section>
  );
};
export default Renting;
