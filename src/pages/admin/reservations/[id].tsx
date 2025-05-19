import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAllReservations } from '@/hooks/useAdmin';
import { useUpdateReservation } from '@/hooks/useAdmin';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ReservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: reservations } = useAllReservations();
  const updateReservation = useUpdateReservation();
  
  const reservation = reservations?.find(r => r.id === id);
  
  if (!reservation) {
    return (
      <ProtectedRoute adminOnly>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Reservation Not Found</h1>
              <Button onClick={() => navigate('/admin/reservations')}>Back to Reservations</Button>
            </div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    updateReservation.mutate({
      id: reservation.id,
      data: { status: newStatus }
    });
  };

  const handlePaymentStatusChange = (newStatus: string) => {
    updateReservation.mutate({
      id: reservation.id,
      data: { payment_status: newStatus }
    });
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Reservation</h1>
            <Button variant="outline" onClick={() => navigate('/admin/reservations')}>
              Back to Reservations
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reservation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Package</h3>
                  <p>{reservation.package?.title}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Customer</h3>
                  <p>{reservation.user?.first_name} {reservation.user?.last_name}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Number of Travelers</h3>
                  <p>{reservation.num_travelers}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Total Price</h3>
                  <p>${reservation.total_price}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Booking Date</h3>
                  <p>{new Date(reservation.booking_date || '').toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Manage Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Reservation Status</h3>
                  <Select
                    defaultValue={reservation.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Payment Status</h3>
                  <Select
                    defaultValue={reservation.payment_status}
                    onValueChange={handlePaymentStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ReservationDetail; 