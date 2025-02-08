import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PhantomProvider } from "../util/phantomProvider";

const WalletConnect = ({ setWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const provider = PhantomProvider();
        if (provider) {
          const response = await provider.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          setWalletConnected(true);
        }
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = PhantomProvider();
      if (provider) {
        const response = await provider.connect();
        setWalletAddress(response.publicKey.toString());
        setWalletConnected(true);
      } else {
        alert("Please install the Phantom Wallet extension.");
      }
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
    >
      {walletAddress
        ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
        : "Connect Wallet"}
    </button>
  );
};
WalletConnect.propTypes = {
  setWalletConnected: PropTypes.func.isRequired,
};

export default WalletConnect;
