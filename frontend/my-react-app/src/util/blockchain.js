import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");

export const verifyNFTOwnership = async (walletAddress) => {
  const publicKey = new PublicKey(walletAddress);
  const nftAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: new PublicKey("NFT_PROGRAM_ID") }
  );
  return nftAccounts.value;
};
