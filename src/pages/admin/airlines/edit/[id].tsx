
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useUpdateAirline } from '@/hooks/useAirlinesAdmin';
import { useAirlineDetails } from '@/hooks/useAirlines';
import AirlineForm from '@/components/admin/AirlineForm';

const EditAirline = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: airlineData, isLoading } = useAirlineDetails(id || '');
  const updateAirline = useUpdateAirline();
  
  const handleSubmit = (data: any) => {
    if (!id) return;
    
    updateAirline.mutate({ id, data }, {
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
            <h1 className="text-3xl font-bold">Edit Airline</h1>
            <Button variant="outline" onClick={() => navigate('/admin/airlines')}>
              Back to Airlines
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : !airlineData ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              Airline not found.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <AirlineForm 
                initialValues={airlineData}
                onSubmit={handleSubmit} 
                isLoading={updateAirline.isPending} 
              />
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default EditAirline;
