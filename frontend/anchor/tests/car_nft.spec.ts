import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { CarNft } from '../target/types/car_nft'

describe('car_nft', () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.CarNft as Program<CarNft>;
  const carNftKeypair = Keypair.generate()

  it('Initialize Car NFT', async () => {
    const testVin = "1HGCM82633A123456"
    const initialUri = "mongodb://initial"
    
    await program.methods
      .initializeCar(testVin, initialUri)  // snake_case to match Rust
      .accounts({
        carAccount: carNftKeypair.publicKey,
        owner: payer.publicKey,
      })
      .signers([carNftKeypair])
      .rpc()

    const carAccount = await program.account.carAccount.fetch(carNftKeypair.publicKey)
    
    expect(carAccount.vin).toEqual(testVin)
    expect(carAccount.owner.toBase58()).toEqual(payer.publicKey.toBase58())
    expect(carAccount.isListed).toEqual(false)
  })

  it('List Car NFT for sale', async () => {
    const listPrice = new anchor.BN(1000000000) // 1 SOL
    
    await program.methods
      .listCar(listPrice)
      .accounts({
        carAccount: carNftKeypair.publicKey,
        owner: payer.publicKey,
      })
      .rpc()

    const carAccount = await program.account.carAccount.fetch(carNftKeypair.publicKey)
    
    expect(carAccount.isListed).toEqual(true)
    expect(carAccount.price.toString()).toEqual(listPrice.toString())
  })

  it('Unlist Car NFT', async () => {
    await program.methods
      .unlistCar()
      .accounts({
        carAccount: carNftKeypair.publicKey,
        owner: payer.publicKey,
      })
      .rpc()

    const carAccount = await program.account.carAccount.fetch(carNftKeypair.publicKey)
    
    expect(carAccount.isListed).toEqual(false)
    expect(carAccount.price.toString()).toEqual('0')
  })

  it('Update metadata URI', async () => {
    const newUri = "mongodb://123456789"
    
    await program.methods
      .updateMetadata(newUri)
      .accounts({
        carAccount: carNftKeypair.publicKey,
        owner: payer.publicKey,
      })
      .rpc()

    const carAccount = await program.account.carAccount.fetch(carNftKeypair.publicKey)
    
    expect(carAccount.metadataUri).toEqual(newUri)
  })

  it('Close the car account', async () => {
    await program.methods
      .closeCar()
      .accounts({
        carAccount: carNftKeypair.publicKey,
        owner: payer.publicKey,
      })
      .rpc()

    const carAccount = await program.account.carAccount.fetchNullable(carNftKeypair.publicKey)
    expect(carAccount).toEqual(null)
  })
})