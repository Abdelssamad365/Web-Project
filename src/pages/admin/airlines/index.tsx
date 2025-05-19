
import React from 'react';
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
import { useAirlines } from '@/hooks/useAirlines';
import { Edit, Trash } from 'lucide-react';
import { useDeleteAirline } from '@/hooks/useAirlinesAdmin';
import { toast } from '@/hooks/use-toast';

const AirlinesAdmin = () => {
  const { data: airlines, isLoading, error } = useAirlines();
  const deleteAirline = useDeleteAirline();
  const navigate = useNavigate();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this airline? This action cannot be undone.')) {
      deleteAirline.mutate(id);
    }
  };
  
  const handleEdit = (id: string) => {
    navigate(`/admin/airlines/edit/${id}`);
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Airline Management</h1>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/admin/airlines/create')}>Create New Airline</Button>
              <Button variant="outline" onClick={() => navigate('/admin')}>Back to Admin</Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              An error occurred while loading airlines.
            </div>
          ) : (
            <Table>
              <TableCaption>List of all airlines</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {airlines?.map((airline) => (
                  <TableRow key={airline.id}>
                    <TableCell className="font-medium">{airline.name}</TableCell>
                    <TableCell>{airline.description ? airline.description.slice(0, 100) + (airline.description.length > 100 ? '...' : '') : 'No description'}</TableCell>
                    <TableCell>
                      {airline.logo_url ? (
                        <img 
                          src={airline.logo_url} 
                          alt={`${airline.name} logo`} 
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        'No logo'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleEdit(airline.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDelete(airline.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {airlines && airlines.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No airlines found. Add your first airline by clicking the "Create New Airline" button.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AirlinesAdmin;
