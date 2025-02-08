import { useState } from "react";
import PropTypes from 'prop-types';

const CarFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    condition: "all",
    make: "",
    model: "",
    zip: "",
    distance: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white shadow-md rounded-lg">
      <select name="condition" onChange={handleChange} className="p-2 border">
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
      <input
        type="text"
        name="make"
        placeholder="Make"
        onChange={handleChange}
        className="p-2 border"
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        onChange={handleChange}
        className="p-2 border"
      />
      <input
        type="text"
        name="zip"
        placeholder="Zip Code"
        onChange={handleChange}
        className="p-2 border"
      />
      <button
        onClick={() => onFilterChange(filters)}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Search
      </button>
    </div>
  );
};
CarFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default CarFilter;
