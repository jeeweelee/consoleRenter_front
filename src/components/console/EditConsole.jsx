import React, { useState, useEffect } from "react";
import { getConsoleById, updateConsole } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditConsole = () => {
  const [consoleData, setConsoleData] = useState({
    photo: "",
    consoleName: "",
    consoleType: "",
    consolePrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { consoleId } = useParams();

  useEffect(() => {
    const fetchConsole = async () => {
      try {
        const fetchedConsole = await getConsoleById(consoleId);
        setConsoleData(fetchedConsole);
        setImagePreview(`data:image/jpeg;base64,${fetchedConsole.photo}`);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching console details");
      }
    };

    fetchConsole();
  }, [consoleId]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setConsoleData({ ...consoleData, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setConsoleData({ ...consoleData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("consoleName", consoleData.consoleName);
      formData.append("consoleType", consoleData.consoleType);
      formData.append("consolePrice", consoleData.consolePrice);
      formData.append("photo", consoleData.photo); // Assuming photo is correctly set as File object

      const response = await updateConsole(consoleId, formData);
      if (response) {
        setSuccessMessage("Console was updated in the database!");
        const updatedConsole = await getConsoleById(consoleId);
        setConsoleData(updatedConsole);
        setImagePreview(`data:image/jpeg;base64,${updatedConsole.photo}`);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating console");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error updating console: " + error.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Edit Console</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="consoleName" className="form-label hotel-color">
                Console Name
              </label>
              <input
                type="text"
                className="form-control"
                id="consoleName"
                name="consoleName"
                value={consoleData.consoleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="consoleType" className="form-label hotel-color">
                Console Type
              </label>
              <input
                type="text"
                className="form-control"
                id="consoleType"
                name="consoleType"
                value={consoleData.consoleType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="consolePrice" className="form-label hotel-color">
                Console Price
              </label>
              <input
                type="number"
                className="form-control"
                id="consolePrice"
                name="consolePrice"
                value={consoleData.consolePrice}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label hotel-color">
                Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Console preview"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mt-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link
                to="/existing-consoles"
                className="btn btn-outline-info ml-5"
              >
                Back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Edit Console
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditConsole;
