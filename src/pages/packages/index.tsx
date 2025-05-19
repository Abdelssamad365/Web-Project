
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { usePackages } from '@/hooks/usePackages';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PackagesIndex = () => {
  const { data: packages, isLoading, error } = usePackages();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Travel Packages</h1>
        
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            An error occurred while loading packages.
          </div>
        )}
        
        {packages && packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No travel packages available at the moment.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages?.map(pkg => (
            <Card key={pkg.id} className="overflow-hidden flex flex-col">
              {pkg.image_url ? (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={pkg.image_url} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                <CardDescription>{pkg.destination}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Dates:</span>
                  <span className="font-medium">
                    {new Date(pkg.start_date).toLocaleDateString()} - {new Date(pkg.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-lg text-ocean">${pkg.price}</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => navigate(`/packages/${pkg.id}`)} 
                  className="w-full"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PackagesIndex;
