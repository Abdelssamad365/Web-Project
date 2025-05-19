import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { usePackages } from '@/hooks/usePackages';
import { Link } from 'react-router-dom';

const DestinationsPage = () => {
  const { data: packages, isLoading, error } = usePackages();

  // Extract unique destinations
  const destinations = React.useMemo(() => {
    if (!packages) return [];
    const uniqueDestinations = new Map();
    packages.forEach(pkg => {
      if (!uniqueDestinations.has(pkg.destination)) {
        uniqueDestinations.set(pkg.destination, {
          id: pkg.destination,
          name: pkg.destination,
          country: pkg.destination.split(', ')[1] || pkg.destination,
          image: pkg.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
          description: `Explore amazing travel packages in ${pkg.destination}`,
          packageCount: packages.filter(p => p.destination === pkg.destination).length
        });
      }
    });
    return Array.from(uniqueDestinations.values());
  }, [packages]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container-custom py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Popular Destinations</h1>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
            <p className="font-semibold">Error loading destinations</p>
            <p>{error.message}</p>
          </div>
        ) : !destinations.length ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No destinations available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map(destination => (
              <Link to={`/packages?destination=${encodeURIComponent(destination.name)}`} key={destination.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                  <div className="relative h-48">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-ocean text-sm font-medium">{destination.packageCount} packages available</span>
                      <span className="text-sm text-ocean hover:text-ocean-dark underline">Explore &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DestinationsPage; 