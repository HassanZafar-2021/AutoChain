import React from 'react';

const links = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
];

const categories = [
  'Electric', 'SUV', 'Sedan', 'Pickup Truck', 'Luxury', 
  'Crossover', 'Hybrid', 'Diesel', 'Coupe', 'Hatchback', 'Wagon', 'Convertible'
];

const featuredCars = [
  { name: 'Tesla Model 3', image: '/api/placeholder/400/200', type: 'Electric' },
  { name: 'Tesla Model S', image: '/api/placeholder/400/200', type: 'Electric' },
  { name: 'Nissan Leaf', image: '/api/placeholder/400/200', type: 'Electric' },
  { name: 'Tesla Model Y', image: '/api/placeholder/400/200', type: 'Electric' },
];

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => (
  <div className="bg-purple-600 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-purple-100">{subtitle}</p>
    </div>
  </div>
);

export default function DashboardFeature() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Hero 
        title="Find Your Next Ride" 
        subtitle="Decentralized and Transparent Vehicle Marketplace" 
      />
      
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>New</option>
              <option>Used</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Nissan</option>
              <option>Tesla</option>
              <option>BMW</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Murano</option>
              <option>Model S</option>
              <option>X5</option>
            </select>
            <input 
              type="text" 
              placeholder="Enter ZIP Code" 
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              defaultValue="10276"
            />
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Show 176 matches
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
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                ${index === 0 ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured EVs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">All new EVs</h2>
        <p className="text-gray-600 mb-8">Experience the best way to search new cars</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-48 object-cover rounded-xl mb-4" 
              />
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <span className="text-sm text-purple-600">{car.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Links */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all duration-300">
          <h3 className="text-xl font-semibold text-center mb-6">Helpful Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-purple-50 rounded-xl text-purple-700 font-medium hover:bg-purple-100 transform hover:scale-[1.02] transition-all duration-300 text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}