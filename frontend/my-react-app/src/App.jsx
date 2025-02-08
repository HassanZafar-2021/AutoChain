import { useState } from "react";
import { Link } from "react-router-dom";
import WalletConnect from "./components/walletConnect";
import PropTypes from "prop-types";

function App({ Component, pageProps }) {
  const setWalletConnected = useState(false)[1];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          <Link href="/">AutoChain</Link>
        </h1>
        <div className="space-x-4">
          <Link href="/listings" className="text-gray-700 hover:text-blue-500">
            Listings
          </Link>
          <Link href="/sell" className="text-gray-700 hover:text-blue-500">
            Sell Your Car
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-blue-500">
            Profile
          </Link>
          <WalletConnect setWalletConnected={setWalletConnected} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4 text-center text-gray-600">
        © {new Date().getFullYear()} AutoChain - Decentralized Car Marketplace
      </footer>
    </div>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
