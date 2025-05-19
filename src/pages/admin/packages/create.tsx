
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useCreatePackage } from '@/hooks/usePackageAdmin';
import PackageForm from '@/components/admin/PackageForm';

const CreatePackage = () => {
  const navigate = useNavigate();
  const createPackage = useCreatePackage();
  
  const handleSubmit = (data: any) => {
    createPackage.mutate(data, {
      onSuccess: () => {
        navigate('/admin/packages');
      }
    });
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Create New Package</h1>
            <Button variant="outline" onClick={() => navigate('/admin/packages')}>
              Back to Packages
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <PackageForm 
              onSubmit={handleSubmit} 
              isLoading={createPackage.isPending} 
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CreatePackage;
