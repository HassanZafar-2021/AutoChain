import { createContext, useContext, useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  useWallet,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

// Create the Wallet Context
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(null);
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl("devnet")); // Change to "mainnet-beta" in production

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.publicKey) {
        const balanceLamports = await connection.getBalance(wallet.publicKey);
        setBalance(balanceLamports / 1e9); // Convert lamports to SOL
      }
    };

    fetchBalance();
  }, [wallet.publicKey, connection]);

  const connectWallet = async () => {
    try {
      await wallet.connect();
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const disconnectWallet = () => {
    wallet.disconnect();
    setBalance(null);
  };

  return (
    <WalletContext.Provider
      value={{ wallet, balance, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook for consuming wallet data
export const useWalletContext = () => {
  return useContext(WalletContext);
};

// Wrap the app with Solana Wallet Provider
export const SolanaWalletProviderWrapper = ({ children }) => {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <SolanaWalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <WalletProvider>{children}</WalletProvider>
      </WalletModalProvider>
    </SolanaWalletProvider>
  );
};
