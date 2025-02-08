import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import CarCard from "../components/CarCard";

const Profile = () => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(0);
  const [ownedCars, setOwnedCars] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user wallet balance & NFTs
  useEffect(() => {
    if (!connected || !publicKey) return;

    const fetchProfileData = async () => {
      try {
        // Fetch SOL balance (Replace with actual blockchain call)
        const balanceResponse = await fetch(`/api/balance?wallet=${publicKey}`);
        const { balance } = await balanceResponse.json();
        setBalance(balance);

        // Fetch owned car NFTs (Replace with actual blockchain call)
        const carsResponse = await fetch(`/api/owned-cars?wallet=${publicKey}`);
        const carsData = await carsResponse.json();
        setOwnedCars(carsData);

        // Fetch transaction history
        const transactionsResponse = await fetch(
          `/api/transactions?wallet=${publicKey}`
        );
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [connected, publicKey]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

      {/* User Wallet Details */}
      <div className="bg-white shadow-md p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold">Wallet Details</h2>
        {connected ? (
          <>
            <p className="text-gray-600 mt-2">
              Wallet: {publicKey?.toString()}
            </p>
            <p className="text-gray-600">Balance: {balance} SOL</p>
          </>
        ) : (
          <p className="text-red-500">Wallet not connected</p>
        )}
      </div>

      {/* Owned Cars */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Owned Cars (NFTs)</h2>
        {loading && <p className="text-gray-500">Loading cars...</p>}
        {!loading && ownedCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {ownedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
        {!loading && ownedCars.length === 0 && (
          <p className="text-gray-500 mt-4">No cars owned.</p>
        )}
      </div>

      {/* Transaction History */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        {loading && <p className="text-gray-500">Loading transactions...</p>}
        {!loading && transactions.length > 0 && (
          <ul className="mt-4 border border-gray-200 rounded-lg p-4">
            {transactions.map((tx) => (
              <li key={tx.id} className="py-2 border-b last:border-b-0">
                <span className="font-medium">Car:</span> {tx.car}
                <span className="ml-4 font-medium">Price:</span> {tx.price} USDC
                <span className="ml-4 font-medium">Date:</span>{" "}
                {new Date(tx.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
        {!loading && transactions.length === 0 && (
          <p className="text-gray-500 mt-4">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
