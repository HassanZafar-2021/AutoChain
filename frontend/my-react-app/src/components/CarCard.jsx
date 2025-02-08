import PropTypes from "prop-types";

const CarCard = ({ car }) => (
  <div className="border p-4 rounded-lg shadow-md bg-white">
    <img
      src={car.image}
      alt={car.model}
      className="w-full h-48 object-cover rounded-md"
    />
    <h3 className="text-lg font-bold">
      {car.make} {car.model}
    </h3>
    <p>
      {car.year} | {car.mileage} miles
    </p>
    <p className="font-semibold text-blue-500">${car.price}</p>
    {car.nft && (
      <span className="text-sm bg-green-200 px-2 py-1 rounded">
        NFT Verified
      </span>
    )}
  </div>
);

CarCard.propTypes = {
  car: PropTypes.shape({
    image: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    mileage: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    nft: PropTypes.bool,
  }).isRequired,
};

export default CarCard;
