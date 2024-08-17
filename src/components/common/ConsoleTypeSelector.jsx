import React, { useEffect, useState } from "react";
import { getConsoleTypes } from "../utils/ApiFunctions";

const ConsoleTypeSelector = ({ handleConsoleInputChange, newConsole }) => {
  const [consoleTypes, setConsoleTypes] = useState([]);
  const [showNewConsoleTypeInput, setShowNewConsoleTypesInput] =
    useState(false);
  const [newConsoleType, setNewConsoleType] = useState("");

  useEffect(() => {
    getConsoleTypes().then((data) => {
      setConsoleTypes(data);
    });
  }, []);

  const handleNewConsoleTypeInputChange = (e) => {
    setNewConsoleType(e.target.value);
  };

  const handleAddNewConsoleType = () => {
    if (newConsoleType !== "") {
      setConsoleTypes([...consoleTypes, newConsoleType]);
      setNewConsoleType("");
      setShowNewConsoleTypesInput(false);
    }
  };

  return (
    <>
      {consoleTypes.length > 0 && (
        <div>
          <select
            required
            className="form-select"
            id="consoleType"
            name="consoleType"
            value={newConsole.consoleType}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewConsoleTypesInput(true);
              } else {
                handleConsoleInputChange(e);
              }
            }}
          >
            <option value={""}> Select a console Type</option>
            <option value={"Add New"}> Add New</option>
            {consoleTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          {showNewConsoleTypeInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new console Type"
                onChange={handleNewConsoleTypeInputChange}
              />
              <button
                className="btn btn-store"
                type="button"
                onClick={handleAddNewConsoleType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConsoleTypeSelector;
