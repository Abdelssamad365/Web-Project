import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, getAllReservations, setUserAdminStatus, updateReservation } from '@/services/api';
import { useIsAdmin } from './useProfile';
import { toast } from '@/hooks/use-toast';

export function useAllUsers() {
  const { isAdmin } = useIsAdmin();
  
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    enabled: isAdmin,
  });
}

export function useAllReservations() {
  const { isAdmin } = useIsAdmin();
  
  return useQuery({
    queryKey: ['admin-reservations'],
    queryFn: getAllReservations,
    enabled: isAdmin,
  });
}

export function useSetAdminStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, isAdmin }: { userId: string, isAdmin: boolean }) => 
      setUserAdminStatus(userId, isAdmin),
    onSuccess: () => {
      toast({
        title: 'User Updated',
        description: 'User admin status has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update user status. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updateReservation(id, data),
    onSuccess: (_, variables) => {
      toast({
        title: 'Reservation Updated',
        description: 'The reservation has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update reservation. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
