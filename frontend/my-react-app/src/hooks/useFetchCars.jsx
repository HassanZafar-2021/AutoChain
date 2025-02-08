import { useState, useEffect } from "react";

const useFetchCars = (filters) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        // 🔹 Replace with your API or Blockchain Storage URL (Arweave/IPFS)
        const response = await fetch("/api/cars");
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setError(`Failed to fetch car data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (!filters) return;

    const applyFilters = () => {
      let filtered = cars;

      if (filters.type) {
        filtered = filtered.filter((car) => car.type === filters.type); // New/Used
      }
      if (filters.make) {
        filtered = filtered.filter(
          (car) => car.make.toLowerCase() === filters.make.toLowerCase()
        );
      }
      if (filters.model) {
        filtered = filtered.filter((car) =>
          car.model.toLowerCase().includes(filters.model.toLowerCase())
        );
      }
      if (filters.zip) {
        filtered = filtered.filter((car) => car.zip === filters.zip);
      }
      if (filters.minPrice || filters.maxPrice) {
        filtered = filtered.filter(
          (car) =>
            (!filters.minPrice || car.price >= filters.minPrice) &&
            (!filters.maxPrice || car.price <= filters.maxPrice)
        );
      }

      setFilteredCars(filtered);
    };

    applyFilters();
  }, [filters, cars]);

  return { cars, filteredCars, loading, error };
};

export default useFetchCars;
