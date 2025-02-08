import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import CarCard from "../components/CarCard";

const Listings = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch car listings from backend or blockchain
    useEffect(() => {
        const fetchCars = async () => {
            try {
                // Replace with actual API or blockchain call
                const response = await fetch("/api/cars");
                const data = await response.json();
                setCars(data);
                setFilteredCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
                setError("Failed to load car listings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    // Handle filters from FilterBar
    const handleFilter = (filters) => {
        let filtered = cars;

        if (filters.make) {
            filtered = filtered.filter((car) =>
                car.make.toLowerCase().includes(filters.make.toLowerCase())
            );
        }
        if (filters.model) {
            filtered = filtered.filter((car) =>
                car.model.toLowerCase().includes(filters.model.toLowerCase())
            );
        }
        if (filters.minPrice) {
            filtered = filtered.filter((car) => car.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
            filtered = filtered.filter((car) => car.price <= filters.maxPrice);
        }

        setFilteredCars(filtered);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Car Listings</h1>

            {/* Filter Bar */}
            <FilterBar onFilter={handleFilter} />

            {/* Loading Indicator */}
            {loading && <p className="text-center mt-10 text-gray-500">Loading cars...</p>}
            {!loading && error && <p className="text-center mt-10 text-red-500">{error}</p>}
            {!loading && !error && filteredCars.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {filteredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
            {!loading && !error && filteredCars.length === 0 && (
                <p className="text-center mt-10 text-gray-500">No cars found.</p>
            )}
        </div>
    );
};

export default Listings;
