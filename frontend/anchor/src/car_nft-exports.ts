import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CarNftIDL from '../target/idl/car_nft.json'
import type { CarNft } from '../target/types/car_nft'

// Re-export the generated IDL and type
export { CarNft, CarNftIDL }

// The programId is imported from the program IDL
export const CAR_NFT_PROGRAM_ID = new PublicKey(CarNftIDL.address)

// Helper function to get the Car NFT program
export function getCarNftProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program(
    { ...CarNftIDL, address: address ? address.toBase58() : CarNftIDL.address } as CarNft,
    provider
  )
}

// Helper function to get program ID based on cluster
export function getCarNftProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return CAR_NFT_PROGRAM_ID
  }
}