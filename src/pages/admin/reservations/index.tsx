
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAllReservations } from '@/hooks/useAdmin';
import { Badge } from "@/components/ui/badge";

const ReservationsAdmin = () => {
  const { data: reservations, isLoading, error } = useAllReservations();
  const navigate = useNavigate();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'completed': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getPaymentBadgeClass = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100';
      case 'processing': return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'refunded': return 'bg-cyan-100 text-cyan-800 hover:bg-cyan-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reservation Management</h1>
            <Button onClick={() => navigate('/admin')}>Back to Admin</Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              An error occurred while loading reservations.
            </div>
          ) : (
            <Table>
              <TableCaption>List of all reservations</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations?.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.package?.title}</TableCell>
                    <TableCell>{reservation.user?.first_name} {reservation.user?.last_name}</TableCell>
                    <TableCell>{reservation.num_travelers}</TableCell>
                    <TableCell>${reservation.total_price}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(reservation.status)}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPaymentBadgeClass(reservation.payment_status)}>
                        {reservation.payment_status.charAt(0).toUpperCase() + reservation.payment_status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/reservations/${reservation.id}`)}
                      >
                        Manage
                      </Button>
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

export default ReservationsAdmin;
