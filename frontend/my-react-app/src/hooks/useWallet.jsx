import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const useWalletConnect = () => {
  const { connection } = useConnection();
  const { publicKey, wallet, connect, disconnect, connecting } = useWallet();
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;
      try {
        const balance = await connection.getBalance(new PublicKey(publicKey));
        setBalance(balance / 1e9); // Convert lamports to SOL
      } catch (err) {
        console.error(err);
        setError("Failed to fetch balance");
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  return {
    wallet,
    publicKey,
    balance,
    connecting,
    connect,
    disconnect,
    error,
  };
};

export default useWalletConnect;
