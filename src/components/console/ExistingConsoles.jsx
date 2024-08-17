import React, { useEffect, useState } from "react";
import { deleteConsole, getAllConsoles } from "../utils/ApiFunctions";
import { Col } from "react-bootstrap";
import ConsoleFilter from "../common/ConsoleFilter";
import ConsolePaginator from "../common/ConsolePaginator";
import { FaTrashAlt, FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingConsoles = () => {
  const [consoles, setConsoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [consolesPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredConsoles, setFilteredConsoles] = useState([]);
  const [selectedConsoleType, setSelectedConsoleType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchConsoles();
  }, []);

  const fetchConsoles = async () => {
    setIsLoading(true);
    try {
      const result = await getAllConsoles();
      console.log("Fetched consoles:", result); // Debug log
      setConsoles(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedConsoleType === "") {
      setFilteredConsoles(consoles);
    } else {
      const filtered = consoles.filter(
        (console) => console.consoleType === selectedConsoleType
      );
      setFilteredConsoles(filtered);
    }
    setCurrentPage(1);
  }, [consoles, selectedConsoleType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (consoleId) => {
    try {
      const result = await deleteConsole(consoleId);
      if (result === "") {
        setSuccessMessage(`Console No ${consoleId} was deleted`);
        fetchConsoles();
      } else {
        console.error(`Error Deleting Console : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (filteredConsoles, consolesPerPage, consoles) => {
    const totalConsoles =
      filteredConsoles.length > 0 ? filteredConsoles.length : consoles.length;
    return Math.ceil(totalConsoles / consolesPerPage);
  };

  const indexOfLastConsole = currentPage * consolesPerPage;
  const indexOfFirstConsole = indexOfLastConsole - consolesPerPage;
  const currentConsoles = filteredConsoles.slice(
    indexOfFirstConsole,
    indexOfLastConsole
  );

  return (
    <>
      {isLoading ? (
        <p>Loading existing consoles</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing consoles</h2>
              <Link to={"/add-console"}>
                <FaPlus /> Add New Console
              </Link>
            </div>
            <Col md={6} className="mb-3 mb-md-0">
              <ConsoleFilter
                data={consoles}
                setFilteredData={setFilteredConsoles}
              ></ConsoleFilter>
            </Col>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Console Name</th>
                  <th>Console Type</th>
                  <th>Console Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentConsoles.map((console) => (
                  <tr key={console.id} className="text-center">
                    <td>{console.id}</td>
                    <td>{console.consoleName}</td>
                    <td>{console.consoleType}</td>
                    <td>{console.consolePrice}</td>
                    <td className="gap-2">
                      <Link to={`/edit-console/${console.id}`}>
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit></FaEdit>
                        </span>
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(console.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ConsolePaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredConsoles,
                consolesPerPage,
                consoles
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingConsoles;
