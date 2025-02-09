'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WalletButton } from '../solana/solana-provider'

export default function AccountListFeature() {
  const { publicKey } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (publicKey) {
      router.push(`/account/${publicKey.toBase58()}`)
    }
  }, [publicKey, router])

  return (
    <div className="hero py-16">
      <div className="hero-content text-center">
        <WalletButton />
      </div>
    </div>
  )
}
