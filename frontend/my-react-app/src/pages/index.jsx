import { useState } from "react";
import CarFilter from "../components/CarFilter";
import CarCard from "../components/CarCard";
import mockCars from "../data/mockCars";

const Home = () => {
  const [filteredCars, setFilteredCars] = useState(mockCars);

  const handleFilterChange = (filters) => {
    const filtered = mockCars.filter(
      (car) =>
        (filters.condition === "all" || car.condition === filters.condition) &&
        (!filters.make ||
          car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
        (!filters.model ||
          car.model.toLowerCase().includes(filters.model.toLowerCase()))
    );
    setFilteredCars(filtered);
  };

  return (
    <div className="p-6">
      <CarFilter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-3 gap-6 mt-6">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Home;
