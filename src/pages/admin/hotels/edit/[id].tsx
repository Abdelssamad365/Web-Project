
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useUpdateHotel } from '@/hooks/useHotelsAdmin';
import { useHotelDetails } from '@/hooks/useHotels';
import HotelForm from '@/components/admin/HotelForm';

const EditHotel = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: hotelData, isLoading } = useHotelDetails(id || '');
  const updateHotel = useUpdateHotel();
  
  const handleSubmit = (data: any) => {
    if (!id) return;
    
    updateHotel.mutate({ id, data }, {
      onSuccess: () => {
        navigate('/admin/hotels');
      }
    });
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Edit Hotel</h1>
            <Button variant="outline" onClick={() => navigate('/admin/hotels')}>
              Back to Hotels
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : !hotelData ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              Hotel not found.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <HotelForm 
                initialValues={hotelData}
                onSubmit={handleSubmit} 
                isLoading={updateHotel.isPending} 
              />
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default EditHotel;
