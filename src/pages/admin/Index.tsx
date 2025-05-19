import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Users, Calendar, Hotel, Plane, Star } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/api';

const AdminIndex = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
      </div>
    );
  }
  
  if (!profile?.is_admin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You do not have permission to access the admin area.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container-custom py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your travel agency's resources.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Packages Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Package className="h-8 w-8 text-ocean mb-2" />
                <CardTitle>Packages</CardTitle>
                <CardDescription>Manage travel packages and offers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Create, edit, and delete travel packages. Set pricing, availability, and manage bookings.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => navigate('/admin/packages')}
                >
                  Manage Packages
                </Button>
              </CardFooter>
            </Card>
            
            {/* Users Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-ocean mb-2" />
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage user accounts and profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">View and manage user accounts, update user details, and handle user permissions.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => navigate('/admin/users')}
                >
                  Manage Users
                </Button>
              </CardFooter>
            </Card>
            
            {/* Reservations Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-8 w-8 text-ocean mb-2" />
                <CardTitle>Reservations</CardTitle>
                <CardDescription>Handle bookings and reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Process reservations, update booking status, and manage payments for travel packages.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => navigate('/admin/reservations')}
                >
                  Manage Reservations
                </Button>
              </CardFooter>
            </Card>
            
            {/* Hotels Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Hotel className="h-8 w-8 text-ocean mb-2" />
                <CardTitle>Hotels</CardTitle>
                <CardDescription>Manage hotel partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Add and edit hotel information, manage room availability, and handle hotel partnerships.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => navigate('/admin/hotels')}
                >
                  Manage Hotels
                </Button>
              </CardFooter>
            </Card>
            
            {/* Airlines Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Plane className="h-8 w-8 text-ocean mb-2" />
                <CardTitle>Airlines</CardTitle>
                <CardDescription>Manage airline partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Add and edit airline information, manage flight schedules, and handle airline partnerships.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => navigate('/admin/airlines')}
                >
                  Manage Airlines
                </Button>
              </CardFooter>
            </Card>
            
            {/* Reviews Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-8 w-8 text-ocean mb-2" />
                <CardTitle>Reviews</CardTitle>
                <CardDescription>Manage customer reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">View and moderate customer reviews for travel packages, hotels, and airlines.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-ocean hover:bg-ocean-dark"
                  onClick={() => navigate('/admin/reviews')}
                >
                  Manage Reviews
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminIndex;
