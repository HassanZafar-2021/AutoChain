'use client'

import { Program } from '@coral-xyz/anchor'

import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useFrontendProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF'), [cluster])
  const idl = useMemo(() => {
    return {
      address: 'YourAddressHere',
      metadata: {
        name: 'YourProgramName',
        version: '1.0.0',
        spec: [],
      },
      instructions: [],
    }
  }, [cluster])
  const program = useMemo(() => idl && provider ? new Program(idl as Idl, programId, provider) : null, [idl, programId, provider])


  const accounts = useQuery({
    queryKey: ['frontend', 'all', { cluster }],
    queryFn: () => program.account.frontend.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['frontend', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ frontend: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useFrontendProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useFrontendProgram()

  const accountQuery = useQuery({
    queryKey: ['frontend', 'fetch', { cluster, account }],
    queryFn: () => program.account.frontend.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['frontend', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ frontend: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['frontend', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ frontend: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['frontend', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ frontend: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['frontend', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ frontend: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
