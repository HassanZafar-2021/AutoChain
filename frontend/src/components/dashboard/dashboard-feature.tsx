'use client'

import React, { useState, useEffect } from 'react';

interface Listing {
  id: string;
  name: string;
  image: string;
  type: string;
  price: string;
  verified: boolean;
}

interface BlockchainData {
  listings: Listing[];
  totalListings: number;
  loading: boolean;
}

// Simulate blockchain data fetching
const useMockBlockchainData = (): BlockchainData => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
const mockListings: Listing[] = [
  { id: '0x1', name: 'Tesla Model 3', image: '/image.png', type: 'Electric', price: '35,000 SOL', verified: true },
  { id: '0x2', name: 'Tesla Model S', image: '/car.png', type: 'Electric', price: '45,000 SOL', verified: true },
  { id: '0x3', name: 'Nissan Leaf', image: '/nisan.png', type: 'Electric', price: '28,000 SOL', verified: true },
  { id: '0x4', name: 'Tesla Model Y', image: '/suv.png', type: 'Electric', price: '40,000 SOL', verified: true }
];


      setListings(mockListings);
      setTotalListings(176);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { listings, totalListings, loading };
};

const WelcomeMessage = () => (
  <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white p-4 rounded-lg mb-8 animate-fade-in">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
      <p className="text-lg">
        🎉 Welcome to the future of car buying! Transparent, secure, and decentralized.
      </p>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-300">
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
  'Electric', 'SUV', 'Sedan', 'Pickup Truck', 'Luxury', 
  'Crossover', 'Hybrid', 'Diesel', 'Coupe', 'Hatchback', 'Wagon', 'Convertible'
];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const useRandomColor = () => {
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRandomColor()); // Update state every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Runs once, but setInterval keeps updating state

  return color;
};

export default function DashboardFeature() {
  const { listings, totalListings, loading } = useMockBlockchainData();
  const [selectedCategory, setSelectedCategory] = useState('Electric');
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Rest of the component remains the same... */}
      {/* Hero Section */}
      <div className="bg-purple-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h1 
            className="text-5xl font-bold mb-4 animate-fade-in"
            style={{ color: getRandomColor() }}
            >
            Find Your Next Ride on the Blockchain
            </h1>
          <p className="text-xl text-purple-100 mb-8 animate-fade-in-delay">
            Decentralized and Transparent Vehicle Marketplace
          </p>
          <button 
            onClick={() => setWalletConnected(!walletConnected)}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl hover:bg-purple-50 
                     transform hover:scale-105 transition-all duration-300 
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                     focus:ring-offset-purple-600"
          >
            {walletConnected ? '✓ Wallet Connected' : 'Connect Wallet'}
          </button>
        </div>
      </div>

      <WelcomeMessage />
      
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>New</option>
              <option>Used</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Any Make</option>
              <option>Tesla</option>
              <option>Nissan</option>
              <option>BMW</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Any Model</option>
              <option>Model S</option>
              <option>Leaf</option>
              <option>X5</option>
            </select>
            <input 
              type="text" 
              placeholder="Enter ZIP Code" 
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Show {totalListings} matches
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Popular categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                ${category === selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Listings</h2>
            <p className="text-gray-600">Verified blockchain listings</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sorted by:</span>
            <select className="bg-white border border-gray-200 p-2 rounded-lg">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {listings.map((car) => (
              <div 
                key={car.id}
                className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
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
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-purple-600">{car.type}</span>
                  <span className="text-lg font-bold">{car.price}</span>
                </div>
                <button className="w-full mt-4 bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-all duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{totalListings}</div>
              <div className="text-gray-600">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Blockchain Verified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Secure Transactions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}