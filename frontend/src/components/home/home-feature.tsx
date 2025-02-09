import { HomeUI } from './home-ui';
import { useCarListings } from './home-data-access';

export const HomeFeature = () => {
  const { data: listings, isLoading } = useCarListings();

  return (
    <HomeUI 
      listings={listings || []}
      isLoading={isLoading}
    />
  );
};