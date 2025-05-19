
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useCreateAirline } from '@/hooks/useAirlinesAdmin';
import AirlineForm from '@/components/admin/AirlineForm';

const CreateAirline = () => {
  const navigate = useNavigate();
  const createAirline = useCreateAirline();
  
  const handleSubmit = (data: any) => {
    createAirline.mutate(data, {
      onSuccess: () => {
        navigate('/admin/airlines');
      }
    });
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Create New Airline</h1>
            <Button variant="outline" onClick={() => navigate('/admin/airlines')}>
              Back to Airlines
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <AirlineForm 
              onSubmit={handleSubmit} 
              isLoading={createAirline.isPending} 
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CreateAirline;
