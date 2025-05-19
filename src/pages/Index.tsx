import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchForm from '@/components/ui/SearchForm';
import PackageCard from '@/components/ui/PackageCard';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { usePackages } from '@/hooks/usePackages';
import { formatCurrency } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getAllReviews } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { data: packages, isLoading, error } = usePackages();
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: getAllReviews,
  });
  
  // Get featured packages (first 3 packages)
  const featuredPackages = packages?.slice(0, 3) || [];
  
  // Get unique destinations from packages
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
  
  // Get featured reviews (first 3 reviews with average rating >= 3)
  const featuredReviews = React.useMemo(() => {
    if (!reviews) return [];
    return reviews
      .filter(review => (review.hotel_rating + review.airline_rating) / 2 >= 3)
      .slice(0, 3);
  }, [reviews]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover the World with WanderLuxe</h1>
            <p className="text-xl md:text-2xl mb-8">Unforgettable travel experiences crafted just for you</p>
            <Link to="/packages">
              <Button size="lg" className="bg-ocean hover:bg-ocean-dark text-white font-semibold">
                Explore Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Search Form Section */}
      <section className="container-custom -mt-16 relative z-20 mb-16">
        <SearchForm />
      </section>
      
      {/* Featured Packages Section */}
      <section className="container-custom mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Travel Packages</h2>
            <p className="text-gray-600">Handpicked experiences for unforgettable journeys</p>
          </div>
          <Link to="/packages" className="mt-4 md:mt-0">
            <Button variant="outline" className="border-ocean text-ocean hover:bg-ocean hover:text-white">
              View All Packages
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            <p className="font-semibold">Error loading packages</p>
            <p>{error.message}</p>
          </div>
        ) : !featuredPackages.length ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured packages available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map(pkg => (
              <PackageCard 
                key={pkg.id}
                id={pkg.id}
                title={pkg.title}
                destination={pkg.destination}
                image={pkg.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'}
                price={pkg.price}
                duration={`${new Date(pkg.start_date).toLocaleDateString()} - ${new Date(pkg.end_date).toLocaleDateString()}`}
                rating={4.5}
                featured={true}
              />
            ))}
          </div>
        )}
      </section>
      
      {/* Popular Destinations Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our most sought-after travel destinations with exclusive packages and unforgettable experiences</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
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
        </div>
      </section>
      
      {/* Reviews Section */}
      {!reviewsLoading && featuredReviews.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">What Our Travelers Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Read authentic reviews from our satisfied customers about their travel experiences</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredReviews.map((review) => (
                <Card key={review.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round((review.hotel_rating + review.airline_rating) / 2)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {((review.hotel_rating + review.airline_rating) / 2).toFixed(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-4">{review.comments}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        <p>Hotel Rating: {review.hotel_rating}/5</p>
                        <p>Airline Rating: {review.airline_rating}/5</p>
                      </div>
                      <p>{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Why Choose Us Section */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why Choose WanderLuxe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're dedicated to creating memorable travel experiences with attention to every detail</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-ocean/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Trusted Agency</h3>
            <p className="text-gray-600">Over 20 years of experience with thousands of satisfied clients</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-ocean/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Best Price Guarantee</h3>
            <p className="text-gray-600">We promise the best rates and packages for your dream vacation</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-ocean/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Personalized Service</h3>
            <p className="text-gray-600">Tailored travel experiences designed to meet your specific needs</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-ocean/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ocean" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Transparent Policy</h3>
            <p className="text-gray-600">Clear booking terms with no hidden fees or surprise charges</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
