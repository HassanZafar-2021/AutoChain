import { useState } from "react";
import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AutoChain
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/listings" className="text-gray-700 hover:text-blue-500">
            Listings
          </Link>
          <Link to="/sell" className="text-gray-700 hover:text-blue-500">
            Sell Your Car
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-500">
            Profile
          </Link>
        </div>

        {/* WalletConnect Component */}
        <div className="hidden md:block">
          <WalletConnect />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center">
          <Link to="/" className="block text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link
            to="/listings"
            className="block text-gray-700 hover:text-blue-500"
          >
            Listings
          </Link>
          <Link to="/sell" className="block text-gray-700 hover:text-blue-500">
            Sell Your Car
          </Link>
          <Link
            to="/profile"
            className="block text-gray-700 hover:text-blue-500"
          >
            Profile
          </Link>
          <WalletConnect />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
