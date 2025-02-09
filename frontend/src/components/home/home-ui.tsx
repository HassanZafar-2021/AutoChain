import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../../../components/ui/button';


import { Search, Car, Shield } from 'lucide-react';
import type { CarListing } from "./home-data-access"

interface HomeUIProps {
  listings: CarListing[];
  isLoading: boolean;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card>
    <CardHeader>
      {icon}
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {description}
    </CardContent>
  </Card>
);

const CarListingCard = ({ listing }: { listing: CarListing }) => (
  <Card>
    <img
      src={listing.images[0]}
      alt={`${listing.year} ${listing.make} ${listing.model}`}
      className="w-full h-48 object-cover"
    />
    <CardContent className="p-4">
      <h3 className="text-xl font-bold mb-2">
        {listing.year} {listing.make} {listing.model}
      </h3>
      <div className="flex justify-between text-gray-600 mb-4">
        <span>{listing.mileage.toLocaleString()} miles</span>
        <span>${listing.price.toLocaleString()}</span>
      </div>
      <Button className="w-full">View Details</Button>
    </CardContent>
  </Card>
);

export const HomeUI = ({ listings, isLoading }: HomeUIProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Decentralized Car Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Transparent, fair, and hassle-free vehicle transactions on the blockchain
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-primary">
            Browse Cars
          </Button>
          <Button size="lg" variant="outline">
            List Your Car
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Car className="w-12 h-12 text-primary mb-2" />}
          title="NFT-Based Ownership"
          description="Each vehicle is represented as a unique NFT, ensuring verifiable ownership and complete transaction history."
        />
        <FeatureCard
          icon={<Search className="w-12 h-12 text-primary mb-2" />}
          title="Transparent History"
          description="Access complete vehicle history including maintenance, accidents, and ownership changes - all stored on blockchain."
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-primary mb-2" />}
          title="Secure Transactions"
          description="Smart contracts ensure safe transfers with escrow protection and instant settlements using USDC."
        />
      </section>

      {/* Featured Listings */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Listings</h2>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <CarListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};