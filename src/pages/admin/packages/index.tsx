import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Edit, Trash, Plus, Search } from 'lucide-react';
import { useDeletePackage } from '@/hooks/usePackageAdmin';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PackagesAdmin = () => {
  const { data: packages, isLoading, error } = usePackages();
  const deletePackage = useDeletePackage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null);
  
  const handleDelete = (id: string) => {
    setPackageToDelete(id);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      deletePackage.mutate(packageToDelete, {
        onSuccess: () => {
          setPackageToDelete(null);
          toast({
            title: 'Package Deleted',
            description: 'The package has been successfully deleted.',
          });
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message || 'Failed to delete package. Please try again.',
            variant: 'destructive',
          });
        },
      });
    }
  };
  
  const handleEdit = (id: string) => {
    navigate(`/admin/packages/edit/${id}`);
  };

  const filteredPackages = packages?.filter(pkg => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Package Management</h1>
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate('/admin/packages/create')}
                className="bg-ocean hover:bg-ocean-dark"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Package
              </Button>
              <Button variant="outline" onClick={() => navigate('/admin')}>
                Back to Admin
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search packages by title or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
          ) : !filteredPackages?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No packages found</p>
              {searchQuery && (
                <p className="text-sm text-gray-400 mt-2">
                  Try adjusting your search query
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableCaption>A list of all travel packages</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available Slots</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.title}</TableCell>
                      <TableCell>{pkg.destination}</TableCell>
                      <TableCell>{formatCurrency(pkg.price)}</TableCell>
                      <TableCell>{pkg.available_slots}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={pkg.available_slots > 0 ? "default" : "destructive"}
                        >
                          {pkg.available_slots > 0 ? 'Available' : 'Sold Out'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(pkg.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(pkg.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
        
        <Footer />

        <AlertDialog open={!!packageToDelete} onOpenChange={() => setPackageToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the package
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ProtectedRoute>
  );
};

export default PackagesAdmin;
