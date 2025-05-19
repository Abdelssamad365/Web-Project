
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useUpdatePackage } from '@/hooks/usePackageAdmin';
import { usePackageDetails } from '@/hooks/usePackages';
import PackageForm from '@/components/admin/PackageForm';

const EditPackage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: packageData, isLoading } = usePackageDetails(id || '');
  const updatePackage = useUpdatePackage();
  
  const handleSubmit = (data: any) => {
    if (!id) return;
    
    updatePackage.mutate({ id, data }, {
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
            <h1 className="text-3xl font-bold">Edit Package</h1>
            <Button variant="outline" onClick={() => navigate('/admin/packages')}>
              Back to Packages
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : !packageData ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              Package not found.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <PackageForm 
                initialValues={packageData}
                onSubmit={handleSubmit} 
                isLoading={updatePackage.isPending} 
              />
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default EditPackage;
