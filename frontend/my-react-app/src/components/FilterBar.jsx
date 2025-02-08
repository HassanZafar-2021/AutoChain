import { useState } from "react";
import PropTypes from 'prop-types';

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex flex-wrap gap-4 justify-between items-center">
      {/* Make Filter */}
      <div>
        <label className="block text-gray-700 font-medium">Make</label>
        <select
          name="make"
          value={filters.make}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
        </select>
      </div>

      {/* Model Filter */}
      <div>
        <label className="block text-gray-700 font-medium">Model</label>
        <input
          type="text"
          name="model"
          value={filters.model}
          onChange={handleChange}
          placeholder="Enter model"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Min Price Filter */}
      <div>
        <label className="block text-gray-700 font-medium">Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Max Price Filter */}
      <div>
        <label className="block text-gray-700 font-medium">Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Zip Code Filter */}
      <div>
        <label className="block text-gray-700 font-medium">Zip Code</label>
        <input
          type="text"
          name="zip"
          value={filters.zip}
          onChange={handleChange}
          placeholder="Enter zip"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Search Button */}
      <div className="flex items-end">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};
FilterBar.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default FilterBar;

