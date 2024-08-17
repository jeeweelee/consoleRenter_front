import React, { useState } from "react";

import { addConsole } from "../utils/ApiFunctions";
import ConsoleTypeSelector from "../common/ConsoleTypeSelector";
import { Link } from "react-router-dom";

const AddConsole = () => {
  const [newConsole, setNewConsole] = useState({
    photo: null,
    consoleName: "",
    consoleType: "",
    consolePrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConsoleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "consolePrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewConsole({ ...newConsole, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewConsole({ ...newConsole, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addConsole(
        newConsole.photo,
        newConsole.consoleName,
        newConsole.consoleType,
        newConsole.consolePrice
      );
      if (success !== undefined) {
        setSuccessMessage("A new console was added to the database!");
        setNewConsole({
          photo: null,
          consoleName: "",
          consoleType: "",
          consolePrice: "",
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding console");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  setTimeout(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, 3000);

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Console</h2>
            {errorMessage && (
              <div className="alert alert-danger fade show">
                {errorMessage}{" "}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}{" "}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="consoleName" className="form-label">
                  Console Name
                </label>
                <input
                  className="form-control"
                  required
                  id="consoleName"
                  type="text"
                  name="consoleName"
                  value={newConsole.consoleName}
                  onChange={handleConsoleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="consoleType" className="form-label">
                  Console Type
                </label>
                <div>
                  <ConsoleTypeSelector
                    handleConsoleInputChange={handleConsoleInputChange}
                    newConsole={newConsole}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="consolePrice" className="form-label">
                  Console Price
                </label>
                <input
                  className="form-control"
                  required
                  id="consolePrice"
                  type="number"
                  name="consolePrice"
                  value={newConsole.consolePrice}
                  onChange={handleConsoleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Console Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Console Photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                  to="/existing-consoles"
                  className="btn btn-outline-info ml-5"
                >
                  Main
                </Link>
                <button className="btn btn-outline-primary ml-5">
                  Save Console
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddConsole;
