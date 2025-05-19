
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAllUsers, useSetAdminStatus } from '@/hooks/useAdmin';
import { Badge } from '@/components/ui/badge';

const UsersAdmin = () => {
  const { data: users, isLoading, error } = useAllUsers();
  const updateAdminStatus = useSetAdminStatus();
  const navigate = useNavigate();
  
  const handleToggleAdmin = (userId: string, currentStatus: boolean) => {
    updateAdminStatus.mutate({ userId, isAdmin: !currentStatus });
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Button onClick={() => navigate('/admin')}>Back to Admin</Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              An error occurred while loading users.
            </div>
          ) : (
            <Table>
              <TableCaption>List of all registered users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Admin Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.first_name} {user.last_name || ''}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      <Badge variant="outline" className="truncate max-w-[200px]">
                        {user.id}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch 
                          checked={user.is_admin} 
                          onCheckedChange={() => handleToggleAdmin(user.id, !!user.is_admin)}
                        />
                        <span className="ml-2">{user.is_admin ? 'Admin' : 'User'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                      >
                        View Details
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

export default UsersAdmin;
