import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserProfile, getUserReservations } from '@/services/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useDeleteReservation } from '@/hooks/useReservations';
import { useToast } from '@/components/ui/use-toast';

const DashboardIndex = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const deleteReservation = useDeleteReservation();
  const queryClient = useQueryClient();
  
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
  });
  
  const { data: reservations, isLoading: reservationsLoading, refetch } = useQuery({
    queryKey: ['reservations', user?.id],
    queryFn: () => getUserReservations(user!.id),
    enabled: !!user,
  });
  
  const handleDelete = async (reservationId: string) => {
    if (window.confirm('Are you sure you want to delete this reservation? This action cannot be undone.')) {
      try {
        await deleteReservation.mutateAsync(reservationId);
        // Force an immediate refetch after deletion
        await refetch();
        // Update the local state to remove the deleted reservation
        queryClient.setQueryData(['reservations', user?.id], (oldData: any) => {
          if (!oldData) return [];
          return oldData.filter((reservation: any) => reservation.id !== reservationId);
        });
      } catch (error) {
        console.error('Error deleting reservation:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete reservation. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                
                <CardContent>
                  {profileLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ) : profile ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{profile.first_name} {profile.last_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                  ) : (
                    <p>Profile not found</p>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/profile/edit')}
                  >
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
              
              {reservationsLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ) : reservations?.length ? (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <Card key={reservation.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{reservation.package?.title}</h3>
                            <p className="text-gray-600">{reservation.package?.destination}</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm">
                                <span className="text-gray-500">Dates:</span>{' '}
                                {new Date(reservation.package?.start_date).toLocaleDateString()} - {new Date(reservation.package?.end_date).toLocaleDateString()}
                              </p>
                              <p className="text-sm">
                                <span className="text-gray-500">Travelers:</span> {reservation.num_travelers}
                              </p>
                              <p className="text-sm">
                                <span className="text-gray-500">Total:</span> ${reservation.total_price}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                            
                            <p className={`mt-2 text-sm ${
                              reservation.payment_status === 'paid' ? 'text-green-600' :
                              reservation.payment_status === 'processing' ? 'text-yellow-600' :
                              reservation.payment_status === 'refunded' ? 'text-blue-600' :
                              'text-red-600'
                            }`}>
                              Payment: {reservation.payment_status.charAt(0).toUpperCase() + reservation.payment_status.slice(1)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between">
                        {reservation.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => navigate(`/reviews/add/${reservation.id}`)}
                          >
                            Write a Review
                          </Button>
                        )}
                        
                        {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => navigate(`/reservations/${reservation.id}`)}
                          >
                            View Details
                          </Button>
                        )}

                        {(reservation.status === 'cancelled' && reservation.payment_status === 'unpaid') && (
                          <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => handleDelete(reservation.id)}
                            disabled={deleteReservation.isPending}
                          >
                            {deleteReservation.isPending ? 'Deleting...' : 'Delete Reservation'}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center py-12">
                    <p className="text-gray-500 mb-4">You haven't made any reservations yet.</p>
                    <Button onClick={() => navigate('/packages')}>Browse Travel Packages</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardIndex;
