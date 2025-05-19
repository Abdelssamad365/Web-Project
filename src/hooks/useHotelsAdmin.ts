
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHotel, createHotel, updateHotel } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export function useDeleteHotel() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (hotelId: string) => deleteHotel(hotelId),
    onSuccess: () => {
      toast({
        title: 'Hotel Deleted',
        description: 'The hotel has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete hotel. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useCreateHotel() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (hotelData: any) => createHotel(hotelData),
    onSuccess: () => {
      toast({
        title: 'Hotel Created',
        description: 'The hotel has been created successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Creation Failed',
        description: error.message || 'Failed to create hotel. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateHotel() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updateHotel(id, data),
    onSuccess: (_, variables) => {
      toast({
        title: 'Hotel Updated',
        description: 'The hotel has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      queryClient.invalidateQueries({ queryKey: ['hotel', variables.id] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update hotel. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
