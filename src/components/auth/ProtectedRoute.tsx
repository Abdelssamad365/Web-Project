import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, isLoading } = useAuth();
  
  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
    retry: false, // Don't retry on error
  });
  
  // Show loading state while checking authentication
  if (isLoading || (user && profileLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check if email is verified
  if (!user.email_confirmed_at) {
    return <Navigate to="/auth/verify-email" replace />;
  }

  // If there's a profile error and we need admin access, redirect to home
  if (profileError && adminOnly) {
    return <Navigate to="/" replace />;
  }
  
  // Check for admin access if adminOnly is true
  if (adminOnly && !profile?.is_admin) {
    return <Navigate to="/" replace />;
  }
  
  // User is authenticated and has appropriate permissions
  return <>{children}</>;
};
export default ProtectedRoute;

