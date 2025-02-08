import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Button from "./Button";
import Loader from "./Loader";

const CarDetails = ({ cars }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching
    const selectedCar = cars.find((c) => c.id === id);
    setCar(selectedCar);
    setLoading(false);
  }, [id, cars]);

  if (loading) return <Loader />;
  if (!car) return <p className="text-center text-gray-500">Car not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <img
        src={car.image}
        alt={car.make}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold">
        {car.year} {car.make} {car.model}
      </h2>
      <p className="text-gray-500">
        {car.mileage} miles - {car.location}
      </p>

      <div className="mt-4">
        <p className="text-xl font-semibold text-blue-600">${car.price}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Car Details</h3>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Condition: {car.condition}</li>
          <li>Transmission: {car.transmission}</li>
          <li>Fuel Type: {car.fuel}</li>
          <li>Owner History: {car.owners} previous owners</li>
          <li>VIN: {car.vin}</li>
        </ul>
      </div>

      <div className="mt-6 flex gap-4">
        <Button text="Buy Now" className="bg-green-600 hover:bg-green-700" />
        <Button
          text="Contact Seller"
          className="bg-gray-600 hover:bg-gray-700"
        />
      </div>
    </div>
  );
};
CarDetails.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      make: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      mileage: PropTypes.number.isRequired,
      location: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      condition: PropTypes.string.isRequired,
      transmission: PropTypes.string.isRequired,
      fuel: PropTypes.string.isRequired,
      owners: PropTypes.number.isRequired,
      vin: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CarDetails;
