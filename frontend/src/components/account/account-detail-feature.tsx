'use client'

import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'

import { ExplorerLink } from '../cluster/cluster-ui'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { AccountBalance, AccountButtons, AccountTokens, AccountTransactions } from './account-ui'

export default function AccountDetailFeature() {
  const params = useParams()

  const address = useMemo(() => {
    if (!params?.address) return null
    try {
      return new PublicKey(params.address)
    } catch (error) {
      console.error('Invalid public key:', error)
      return null
    }
  }, [params])

  if (!address) {
    return <div className="text-red-500">🚨 Error: Invalid account address</div>
  }

  return (
    <div>
      <AppHero
        title={<AccountBalance address={address} />}
        subtitle={
          <div className="my-4">
            <ExplorerLink path={`account/${address.toBase58()}`} label={ellipsify(address.toBase58())} />
          </div>
        }
      >
        <div className="my-4">
          <AccountButtons address={address} />
        </div>
      </AppHero>

      <div className="space-y-8">
        <AccountTokens address={address} />
        <AccountTransactions address={address} />
      </div>
    </div>
  )
}
