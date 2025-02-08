// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import FrontendIDL from '../target/idl/frontend.json'
import type { Frontend } from '../target/types/frontend'

// Re-export the generated IDL and type
export { Frontend, FrontendIDL }

// The programId is imported from the program IDL.
export const FRONTEND_PROGRAM_ID = new PublicKey(FrontendIDL.address)

// This is a helper function to get the Frontend Anchor program.
export function getFrontendProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...FrontendIDL, address: address ? address.toBase58() : FrontendIDL.address } as Frontend, provider)
}

// This is a helper function to get the program ID for the Frontend program depending on the cluster.
export function getFrontendProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Frontend program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return FRONTEND_PROGRAM_ID
  }
}
