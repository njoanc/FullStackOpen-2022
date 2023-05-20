import React from "react";

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <label htmlFor="filterName">Filter by Name:</label>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
