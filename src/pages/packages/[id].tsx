
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { usePackageDetails } from '@/hooks/usePackages';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { createReservation } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: packageData, isLoading, error } = usePackageDetails(id!);
  const [travelers, setTravelers] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBookNow = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book this package",
        variant: "destructive"
      });
      navigate('/auth/login');
      return;
    }

    setIsBooking(true);
    try {
      const totalPrice = packageData!.price * travelers;
      await createReservation({
        user_id: user.id,
        package_id: packageData!.id,
        total_price: totalPrice,
        num_travelers: travelers,
        status: 'pending',
        payment_status: 'unpaid'
      });
      
      toast({
        title: "Booking successful!",
        description: "Your travel package has been booked."
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Booking failed",
        description: error.message || "There was an error processing your booking",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error ? `Error: ${error.message}` : 'Package not found'}
          </div>
          <Button 
            onClick={() => navigate('/packages')}
            variant="outline"
            className="mt-4"
          >
            Back to Packages
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/packages')}
            variant="outline"
            className="mb-4"
          >
            ← Back to Packages
          </Button>
          
          <h1 className="text-3xl font-bold">{packageData.title}</h1>
          <p className="text-xl text-gray-600 mt-1">{packageData.destination}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {packageData.image_url ? (
              <img 
                src={packageData.image_url} 
                alt={packageData.title}
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            
            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Package</h2>
              <p>{packageData.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {packageData.hotel && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Accommodation</h3>
                    <p className="font-medium text-lg">{packageData.hotel.name}</p>
                    <p className="text-gray-600">{packageData.hotel.city}, {packageData.hotel.country}</p>
                    {packageData.hotel.star_rating && (
                      <div className="flex mt-2">
                        {Array.from({ length: packageData.hotel.star_rating }).map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {packageData.airline && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Airline</h3>
                    <p className="font-medium text-lg">{packageData.airline.name}</p>
                    {packageData.airline.logo_url && (
                      <img 
                        src={packageData.airline.logo_url} 
                        alt={packageData.airline.name}
                        className="h-10 mt-2"
                      />
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
            
            {packageData.convention && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Special Event</h3>
                  <p className="font-medium text-lg">{packageData.convention.name}</p>
                  <p className="text-gray-600 mt-1">{packageData.convention.location}</p>
                  <p className="text-gray-600 mt-1">
                    {new Date(packageData.convention.start_date).toLocaleDateString()} - {new Date(packageData.convention.end_date).toLocaleDateString()}
                  </p>
                  {packageData.convention.description && (
                    <p className="mt-2">{packageData.convention.description}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Booking Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-xl">${packageData.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dates:</span>
                    <span>
                      {new Date(packageData.start_date).toLocaleDateString()} - {new Date(packageData.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{packageData.duration} days</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Slots:</span>
                    <span>{packageData.available_slots}</span>
                  </div>
                  
                  <div className="pt-2">
                    <label className="block text-gray-600 mb-2">Number of Travelers:</label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${packageData.price * travelers}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBookNow}
                  disabled={isBooking || packageData.available_slots < travelers}
                  className="w-full"
                >
                  {isBooking ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Book Now'}
                </Button>
                
                {packageData.available_slots < travelers && (
                  <p className="text-red-500 text-sm mt-2">
                    Not enough slots available for {travelers} travelers.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackageDetail;
