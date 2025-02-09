import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

export interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  images: string[];
  nftAddress: string;
  seller: string;
}

export const useCarListings = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ['carListings', publicKey?.toBase58()],
    queryFn: async () => {
      // Mock data - replace with actual blockchain call
      const mockListings: CarListing[] = [
        {
          id: '1',
          make: 'Toyota',
          model: 'Camry',
          year: 2020,
          price: 25000,
          mileage: 30000,
          images: ['/api/placeholder/400/300'],
          nftAddress: '123...',
          seller: 'ABC...'
        },
      ];
      return mockListings;
    },
  });
};