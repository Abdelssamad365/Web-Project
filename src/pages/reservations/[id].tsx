import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getUserReservation, updateReservation } from '@/services/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface ReservationFormData {
  num_travelers: number;
  total_price?: number;
}

const ReservationDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: reservation, isLoading } = useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getUserReservation(id!),
    enabled: !!id,
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm<ReservationFormData>({
    defaultValues: {
      num_travelers: reservation?.num_travelers || 1,
    },
  });
  
  const updateReservationMutation = useMutation({
    mutationFn: (data: ReservationFormData) => updateReservation(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservation', id] });
      queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] });
      toast({
        title: 'Reservation Updated',
        description: 'Your reservation has been successfully updated.',
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update reservation. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  const cancelReservationMutation = useMutation({
    mutationFn: () => updateReservation(id!, { status: 'cancelled' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservation', id] });
      queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] });
      toast({
        title: 'Reservation Cancelled',
        description: 'Your reservation has been cancelled.',
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to cancel reservation. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: ReservationFormData) => {
    if (!reservation?.package?.price) {
      toast({
        title: 'Error',
        description: 'Package price information is missing.',
        variant: 'destructive',
      });
      return;
    }

    const totalPrice = data.num_travelers * reservation.package.price;
    updateReservationMutation.mutate({
      num_travelers: data.num_travelers,
      total_price: totalPrice,
    });
  };
  
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      cancelReservationMutation.mutate();
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500 mb-4">Reservation not found.</p>
              <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Reservation Details</h1>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{reservation.package?.title}</CardTitle>
                <CardDescription>{reservation.package?.destination}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Dates</p>
                    <p className="font-medium">
                      {new Date(reservation.package?.start_date).toLocaleDateString()} - {new Date(reservation.package?.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-medium">${reservation.total_price}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className={`${
                    reservation.payment_status === 'paid' ? 'text-green-600' :
                    reservation.payment_status === 'processing' ? 'text-yellow-600' :
                    reservation.payment_status === 'refunded' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {reservation.payment_status.charAt(0).toUpperCase() + reservation.payment_status.slice(1)}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {(reservation.status === 'pending' || reservation.status === 'confirmed') && (
              <Card>
                <CardHeader>
                  <CardTitle>Update Reservation</CardTitle>
                  <CardDescription>Modify your reservation details</CardDescription>
                </CardHeader>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="num_travelers">Number of Travelers</Label>
                      <Input
                        id="num_travelers"
                        type="number"
                        min="1"
                        max={reservation.package?.available_slots || 1}
                        {...register('num_travelers', {
                          required: 'Number of travelers is required',
                          min: {
                            value: 1,
                            message: 'At least 1 traveler is required',
                          },
                          max: {
                            value: reservation.package?.available_slots || 1,
                            message: `Maximum ${reservation.package?.available_slots || 1} travelers allowed`,
                          },
                        })}
                      />
                      {errors.num_travelers && (
                        <p className="text-sm text-red-500">{errors.num_travelers.message}</p>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                    >
                      Back to Dashboard
                    </Button>
                    <div className="space-x-2">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={cancelReservationMutation.isPending}
                      >
                        {cancelReservationMutation.isPending ? 'Cancelling...' : 'Cancel Reservation'}
                      </Button>
                      <Button
                        type="submit"
                        disabled={updateReservationMutation.isPending}
                      >
                        {updateReservationMutation.isPending ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ReservationDetail; 