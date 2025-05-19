
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAirline, updateAirline, deleteAirline } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export function useCreateAirline() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (airlineData: any) => createAirline(airlineData),
    onSuccess: () => {
      toast({
        title: 'Airline Created',
        description: 'The airline has been created successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Creation Failed',
        description: error.message || 'Failed to create airline. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateAirline() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updateAirline(id, data),
    onSuccess: (_, variables) => {
      toast({
        title: 'Airline Updated',
        description: 'The airline has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
      queryClient.invalidateQueries({ queryKey: ['airline', variables.id] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update airline. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteAirline() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (airlineId: string) => deleteAirline(airlineId),
    onSuccess: () => {
      toast({
        title: 'Airline Deleted',
        description: 'The airline has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['airlines'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete airline. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
