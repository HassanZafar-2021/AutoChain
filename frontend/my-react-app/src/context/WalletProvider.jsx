import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WalletContextProvider from "../context/WalletProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Home from "../pages/Home";
import Listings from "../pages/Listings";
import Profile from "../pages/Profile";
import CarDetails from "../pages/CarDetails";
import NotFound from "../pages/NotFound";
import "../index.css"; // Ensure Tailwind is applied

const App = () => {
  return (
    <WalletContextProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          {/* Navbar */}
          <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              <Link to="/">AutoChain</Link>
            </h1>
            <div className="space-x-4">
              <Link
                to="/listings"
                className="text-gray-700 hover:text-blue-500"
              >
                Listings
              </Link>
              <Link to="/sell" className="text-gray-700 hover:text-blue-500">
                Sell Your Car
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-500">
                Profile
              </Link>
              <WalletMultiButton /> {/* Wallet Connect Button */}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white shadow-md p-4 text-center text-gray-600">
            © {new Date().getFullYear()} AutoChain - Decentralized Car
            Marketplace
          </footer>
        </div>
      </Router>
    </WalletContextProvider>
  );
};

export default App;
