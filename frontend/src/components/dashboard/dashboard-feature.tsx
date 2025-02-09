"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Listing {
  id: string;
  name: string;
  image: string;
  type: string;
  // price: string;
  verified: boolean;
  condition: string;
  make: string;
  model: string;
  zipCode: string;
  year: number;
  mileage: string;
  transmission: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  // vin: string;
}

interface BlockchainData {
  listings: Listing[];
  totalListings: number;
  loading: boolean;
}

// Modal Components
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-purple-600 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const LearnMoreModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-bold text-purple-400 mb-4">
      About Our Blockchain Car Marketplace
    </h2>
    <div className="text-gray-300 space-y-4">
      <p>
        Welcome to the future of automotive transactions! Our platform leverages
        blockchain technology to create a transparent, secure, and efficient car
        buying experience.
      </p>

      <h3 className="text-xl font-semibold text-purple-400 mt-6">
        Key Features:
      </h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Verified Vehicle History: Every car's history is immutably recorded on
          the blockchain
        </li>
        <li>
          Smart Contracts: Automated, secure transactions with no intermediaries
        </li>
        <li>
          Decentralized Authentication: Transparent verification of vehicle
          ownership
        </li>
        <li>
          Real-time Updates: Instant access to vehicle information and market
          data
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-purple-400 mt-6">
        How It Works:
      </h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Connect your crypto wallet</li>
        <li>Browse our verified vehicle listings</li>
        <li>Access complete vehicle history and documentation</li>
        <li>Make secure, transparent transactions</li>
      </ol>

      <p className="mt-6">
        Join us in revolutionizing the automotive industry with blockchain
        technology!
      </p>
    </div>
  </Modal>
);

const CarDetailsModal = ({
  isOpen,
  onClose,
  car,
}: {
  isOpen: boolean;
  onClose: () => void;
  car: Listing;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="space-y-4">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-64 object-cover rounded-xl"
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-400">{car.name}</h2>
          <span className="text-xl font-bold text-purple-300">{car.price}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Vehicle Details
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="text-gray-400">Make:</span> {car.make}
              </li>
              <li>
                <span className="text-gray-400">Model:</span> {car.model}
              </li>
              <li>
                <span className="text-gray-400">Year:</span> {car.year}
              </li>
              <li>
                <span className="text-gray-400">Condition:</span>{" "}
                {car.condition}
              </li>
              <li>
                <span className="text-gray-400">Mileage:</span> {car.mileage}
              </li>
              {/* <li>
                <span className="text-gray-400">VIN:</span> {car.vin}
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Specifications
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="text-gray-400">Type:</span> {car.type}
              </li>
              <li>
                <span className="text-gray-400">Transmission:</span>{" "}
                {car.transmission}
              </li>
              <li>
                <span className="text-gray-400">Fuel Type:</span> {car.fuelType}
              </li>
              <li>
                <span className="text-gray-400">Exterior:</span>{" "}
                {car.exteriorColor}
              </li>
              <li>
                <span className="text-gray-400">Interior:</span>{" "}
                {car.interiorColor}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

const useMockBlockchainData = (): BlockchainData => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockListings: Listing[] = [
        {
          id: "0x1",
          name: "Tesla Model 3",
          image: "/image.png",
          type: "Electric",
          // price: "35,000 SOL",
          verified: true,
          condition: "New",
          make: "Tesla",
          model: "Model 3",
          zipCode: "94105",
          year: 2024,
          mileage: "0",
          transmission: "Automatic",
          fuelType: "Electric",
          exteriorColor: "Pearl White",
          interiorColor: "Black",
          // vin: "TSLA12345678901234",
        },
        {
          id: "0x2",
          name: "Tesla Model S",
          image: "/car.png",
          type: "Luxury",
          // price: "45,000 SOL",
          verified: true,
          condition: "Used",
          make: "Tesla",
          model: "Model S",
          zipCode: "94105",
          year: 2023,
          mileage: "12,500",
          transmission: "Automatic",
          fuelType: "Electric",
          exteriorColor: "Midnight Silver",
          interiorColor: "White",
          // vin: "TSLA98765432109876",
        },
        {
          id: "0x3",
          name: "Nissan Leaf",
          image: "/nisan.png",
          type: "Electric",
          // price: "28,000 SOL",
          verified: true,
          condition: "New",
          make: "Nissan",
          model: "Leaf",
          zipCode: "90210",
          year: 2024,
          mileage: "0",
          transmission: "Automatic",
          fuelType: "Electric",
          exteriorColor: "Deep Blue Pearl",
          interiorColor: "Black",
          // vin: "NSSN12345678901234",
        },
        {
          id: "0x4",
          name: "BMW X5",
          image: "/suv.png",
          type: "SUV",
          // price: "40,000 SOL",
          verified: true,
          condition: "Used",
          make: "BMW",
          model: "X5",
          zipCode: "90210",
          year: 2023,
          mileage: "15,750",
          transmission: "Automatic",
          fuelType: "Gasoline",
          exteriorColor: "Alpine White",
          interiorColor: "Cognac",
          // vin: "BMW123456789012345",
        },
      ];

      setListings(mockListings);
      setTotalListings(176);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { listings, totalListings, loading };
};

// const useMockBlockchainData = (): BlockchainData => {
//   const [loading, setLoading] = useState(true);
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [totalListings, setTotalListings] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch all tokens from CrossMint
//         const tokens = await crossMint.getAllTokens();

//         // Extract mongoURIs
//         const mongoURIs = tokens.map((token) => token.getMetadata().mongoURI);

//         // Fetch car documents from MongoDB using FastAPI
//         const carDocs = await Promise.all(
//           mongoURIs.map(async (uri) => {
//             const response = await fetch(
//               `http://localhost:8000/getDocument/${uri}`
//             );
//             return response.ok ? await response.json() : null;
//           })
//         );

//         // Filter out failed fetches and update state
//         const validListings = carDocs.filter((car) => car !== null);
//         setListings(validListings);
//         setTotalListings(validListings.length);
//       } catch (error) {
//         console.error("Error fetching blockchain data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { listings, totalListings, loading };
// };

const WelcomeMessage = ({ onLearnMore }: { onLearnMore: () => void }) => (
  <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white p-4 rounded-lg mb-8 animate-fade-in">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
      <p className="text-lg">
        🎉 Welcome to the future of car buying! Transparent, secure, and
        decentralized.
      </p>
      <button
        onClick={onLearnMore}
        className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-300"
      >
        Learn More
      </button>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
  </div>
);

const categories = [
  "All",
  "Electric",
  "SUV",
  "Sedan",
  "Pickup Truck",
  "Luxury",
  "Crossover",
  "Hybrid",
  "Diesel",
  "Coupe",
  "Hatchback",
  "Wagon",
  "Convertible",
];

export default function DashboardFeature() {
  const {
    listings: allListings,
    totalListings,
    loading,
  } = useMockBlockchainData();
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [walletConnected, setWalletConnected] = useState(false);

  // Filter states
  const [condition, setCondition] = useState("Any");
  const [make, setMake] = useState("Any Make");
  const [model, setModel] = useState("Any Model");
  const [zipCode, setZipCode] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Modal states
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Listing | null>(null);

  // Apply filters
  useEffect(() => {
    if (!allListings.length) return;

    let filtered = [...allListings];

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((car) => car.type === selectedCategory);
    }

    // Apply condition filter
    if (condition !== "Any") {
      filtered = filtered.filter((car) => car.condition === condition);
    }

    // Apply make filter
    if (make !== "Any Make") {
      filtered = filtered.filter((car) => car.make === make);
    }

    // Apply model filter
    if (model !== "Any Model") {
      filtered = filtered.filter((car) => car.model === model);
    }

    // Apply ZIP code filter if provided
    if (zipCode.trim()) {
      filtered = filtered.filter((car) =>
        car.zipCode.startsWith(zipCode.substring(0, 3))
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) => parseInt(b.id.slice(2)) - parseInt(a.id.slice(2))
        );
    }

    setFilteredListings(filtered);
  }, [
    allListings,
    selectedCategory,
    condition,
    make,
    model,
    zipCode,
    sortOrder,
  ]);

  const handleShowMatches = () => {
    const resultsSection = document.getElementById("results");
    resultsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <LearnMoreModal
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
      />
      {selectedCar && (
        <CarDetailsModal
          isOpen={!!selectedCar}
          onClose={() => setSelectedCar(null)}
          car={selectedCar}
        />
      )}

      {/* Hero Section */}
      <div className="bg-black border border-purple-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in text-purple-400">
            Find Your Next Ride on the Blockchain
          </h1>
          <p className="text-xl text-purple-300 mb-8 animate-fade-in-delay">
            Decentralized and Transparent Vehicle Marketplace
          </p>
        </div>
      </div>

      <WelcomeMessage onLearnMore={() => setIsLearnMoreOpen(true)} />

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-purple-600 p-6 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="bg-gray-800 border border-purple-500 text-white p-3 rounded-xl hover:border-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Any</option>
              <option>New</option>
              <option>Used</option>
            </select>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="bg-gray-800 border border-purple-500 text-white p-3 rounded-xl hover:border-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Any Make</option>
              <option>Tesla</option>
              <option>Nissan</option>
              <option>BMW</option>
            </select>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-gray-800 border border-purple-500 text-white p-3 rounded-xl hover:border-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Any Model</option>
              <option>Model S</option>
              <option>Leaf</option>
              <option>X5</option>
            </select>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP Code"
              className="bg-gray-800 border border-purple-500 text-white p-3 rounded-xl hover:border-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleShowMatches}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Show {filteredListings.length} matches
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">
          Popular categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                ${
                  category === selectedCategory
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-purple-300 hover:bg-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Listings */}
      <div id="results" className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-400">
              Featured Listings
            </h2>
            <p className="text-gray-400">Verified blockchain listings</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Sorted by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-800 border border-purple-500 text-white p-2 rounded-lg"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredListings.map((car) => (
              <div
                key={car.id}
                className="bg-gray-900 border border-purple-600 p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  {car.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm">
                      Verified ✓
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-purple-400">{car.type}</span>
                  <span className="text-lg font-bold text-purple-300">
                    {car.price}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCar(car)}
                  className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 border-t border-purple-600 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {totalListings}
              </div>
              <div className="text-gray-400">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <div className="text-gray-400">Blockchain Verified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                100%
              </div>
              <div className="text-gray-400">Secure Transactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 border-t border-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                About Us
              </h3>
              <p className="text-gray-400">
                Revolutionizing the automotive industry through blockchain
                technology and transparent transactions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Featured Cars
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Sell Your Car
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@cardapp.com</li>
                <li className="text-gray-400">Phone: (555) 123-4567</li>
                <li className="text-gray-400">Hours: 24/7 Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                Newsletter
              </h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border border-purple-500 text-white p-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Blockchain Car Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
