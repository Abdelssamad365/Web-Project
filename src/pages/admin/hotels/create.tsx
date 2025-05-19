
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useCreateHotel } from '@/hooks/useHotelsAdmin';
import HotelForm from '@/components/admin/HotelForm';

const CreateHotel = () => {
  const navigate = useNavigate();
  const createHotel = useCreateHotel();
  
  const handleSubmit = (data: any) => {
    createHotel.mutate(data, {
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
            <h1 className="text-3xl font-bold">Create New Hotel</h1>
            <Button variant="outline" onClick={() => navigate('/admin/hotels')}>
              Back to Hotels
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <HotelForm 
              onSubmit={handleSubmit} 
              isLoading={createHotel.isPending} 
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CreateHotel;
