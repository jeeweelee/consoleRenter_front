import React, { useState } from 'react';

const ConsoleFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedConsoleType = e.target.value;
    setFilter(selectedConsoleType);
    const filteredConsoles = data.filter((console) =>
      console.consoleType.toLowerCase().includes(selectedConsoleType.toLowerCase())
    );
    setFilteredData(filteredConsoles);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const consoleTypes = ["", ...new Set(data.map((console) => console.consoleType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter consoles by type
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value={""}>Select a console type to filter...</option>
        {consoleTypes.map((type, index) => (
          <option key={index} value={String(type)}>
            {String(type)}
          </option>
        ))}
      </select>
      <button className="btn btn-store" type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default ConsoleFilter;
