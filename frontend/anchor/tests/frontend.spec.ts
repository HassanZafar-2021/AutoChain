import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Frontend} from '../target/types/frontend'

describe('frontend', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Frontend as Program<Frontend>

  const frontendKeypair = Keypair.generate()

  it('Initialize Frontend', async () => {
    await program.methods
      .initialize()
      .accounts({
        frontend: frontendKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([frontendKeypair])
      .rpc()

    const currentCount = await program.account.frontend.fetch(frontendKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Frontend', async () => {
    await program.methods.increment().accounts({ frontend: frontendKeypair.publicKey }).rpc()

    const currentCount = await program.account.frontend.fetch(frontendKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Frontend Again', async () => {
    await program.methods.increment().accounts({ frontend: frontendKeypair.publicKey }).rpc()

    const currentCount = await program.account.frontend.fetch(frontendKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Frontend', async () => {
    await program.methods.decrement().accounts({ frontend: frontendKeypair.publicKey }).rpc()

    const currentCount = await program.account.frontend.fetch(frontendKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set frontend value', async () => {
    await program.methods.set(42).accounts({ frontend: frontendKeypair.publicKey }).rpc()

    const currentCount = await program.account.frontend.fetch(frontendKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the frontend account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        frontend: frontendKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.frontend.fetchNullable(frontendKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
