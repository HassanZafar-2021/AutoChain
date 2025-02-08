import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
} from "@solana/spl-token";

// ✅ Configure Network (Change to "mainnet-beta" for production)
const NETWORK = "devnet";
const connection = new Connection(clusterApiUrl(NETWORK), "confirmed");

/**
 * ✅ Get SOL balance of a wallet
 * @param {string} walletAddress - The public key of the wallet
 * @returns {Promise<number>} - Balance in SOL
 */
export const getWalletBalance = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert from lamports to SOL
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return 0;
  }
};

/**
 * ✅ Send SOL between wallets
 * @param {Keypair} sender - The sender's Keypair
 * @param {string} recipientAddress - The recipient's wallet address
 * @param {number} amount - Amount in SOL
 * @returns {Promise<string>} - Transaction Signature
 */
export const sendSol = async (sender, recipientAddress, amount) => {
  try {
    const recipientPublicKey = new PublicKey(recipientAddress);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * 1e9, // Convert SOL to lamports
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      sender,
    ]);
    console.log("Transaction successful:", signature);
    return signature;
  } catch (error) {
    console.error("Error sending SOL:", error);
    return null;
  }
};

/**
 * ✅ Get associated token account for a specific SPL token
 * @param {string} walletAddress - Wallet public key
 * @param {string} mintAddress - Token mint address
 * @returns {Promise<string>} - Token account address
 */
export const getTokenAccount = async (walletAddress, mintAddress) => {
  try {
    const ownerPublicKey = new PublicKey(walletAddress);
    const mintPublicKey = new PublicKey(mintAddress);
    const tokenAccount = await getAssociatedTokenAddress(
      mintPublicKey,
      ownerPublicKey
    );
    return tokenAccount.toBase58();
  } catch (error) {
    console.error("Error fetching token account:", error);
    return null;
  }
};

/**
 * ✅ Transfer SPL tokens
 * @param {Keypair} sender - Sender's Keypair
 * @param {string} recipientAddress - Recipient's wallet address
 * @param {string} mintAddress - Token mint address
 * @param {number} amount - Amount of tokens to transfer
 * @returns {Promise<string>} - Transaction Signature
 */
export const transferTokens = async (
  sender,
  recipientAddress,
  mintAddress,
  amount
) => {
  try {
    const senderTokenAccount = await getTokenAccount(
      sender.publicKey.toBase58(),
      mintAddress
    );
    const recipientTokenAccount = await getTokenAccount(
      recipientAddress,
      mintAddress
    );

    const transaction = new Transaction().add(
      createTransferInstruction(
        new PublicKey(senderTokenAccount),
        new PublicKey(recipientTokenAccount),
        sender.publicKey,
        amount
      )
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      sender,
    ]);
    console.log("Token transfer successful:", signature);
    return signature;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    return null;
  }
};

/**
 * ✅ Verify if a wallet owns an NFT
 * @param {string} walletAddress - The user's public key
 * @returns {Promise<boolean>} - True if owns NFT, else False
 */
export const verifyNFTOwnership = async (walletAddress) => {
  try {
    const publicKey = new PublicKey(walletAddress);
    const nftAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      } // Correct SPL Token Program
    );

    return nftAccounts.value.length > 0; // If owns at least one NFT, return true
  } catch (error) {
    console.error("Error verifying NFT ownership:", error);
    return false;
  }
};

export default {
  getWalletBalance,
  sendSol,
  getTokenAccount,
  transferTokens,
  verifyNFTOwnership,
};
