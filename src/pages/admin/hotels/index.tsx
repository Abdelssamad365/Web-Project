
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
import { useHotels } from '@/hooks/useHotels';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Star } from 'lucide-react';
import { useDeleteHotel } from '@/hooks/useHotelsAdmin';
import { toast } from '@/hooks/use-toast';

const HotelsAdmin = () => {
  const { data: hotels, isLoading, error } = useHotels();
  const deleteHotel = useDeleteHotel();
  const navigate = useNavigate();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      deleteHotel.mutate(id);
    }
  };
  
  const handleEdit = (id: string) => {
    navigate(`/admin/hotels/edit/${id}`);
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Hotel Management</h1>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/admin/hotels/create')}>Create New Hotel</Button>
              <Button variant="outline" onClick={() => navigate('/admin')}>Back to Admin</Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              An error occurred while loading hotels.
            </div>
          ) : (
            <Table>
              <TableCaption>List of all hotels</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels?.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{hotel.city}</span>
                        <span className="text-xs text-gray-500">{hotel.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        {hotel.star_rating ? renderStars(hotel.star_rating) : 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>{hotel.address || 'No address available'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleEdit(hotel.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDelete(hotel.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HotelsAdmin;
