import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserReservations, createReservation, deleteReservation } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useUserReservations() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['reservations', user?.id],
    queryFn: () => getUserReservations(user!.id),
    enabled: !!user,
  });
}

export function useCreateReservation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createReservation,
    onSuccess: (data) => {
      toast({
        title: 'Reservation Created',
        description: 'Your reservation has been successfully created.',
      });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      return data;
    },
    onError: (error: any) => {
      toast({
        title: 'Reservation Failed',
        description: error.message || 'Failed to create reservation. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteReservation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: async (_, deletedId) => {
      // First invalidate all related queries
      await queryClient.invalidateQueries({ queryKey: ['reservations'] });
      await queryClient.invalidateQueries({ queryKey: ['reservations', user?.id] });
      await queryClient.invalidateQueries({ queryKey: ['admin-reservations'] });
      
      // Then force a refetch of the user's reservations
      await queryClient.refetchQueries({ 
        queryKey: ['reservations', user?.id],
        type: 'active',
        exact: true
      });

      // Update the cache directly to remove the deleted reservation
      queryClient.setQueryData(['reservations', user?.id], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((reservation: any) => reservation.id !== deletedId);
      });

      toast({
        title: 'Reservation Deleted',
        description: 'Your reservation has been successfully deleted.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Deletion Failed',
        description: error.message || 'Failed to delete reservation. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
