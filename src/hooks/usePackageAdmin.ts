
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePackage, createPackage, updatePackage } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export function useDeletePackage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (packageId: string) => deletePackage(packageId),
    onSuccess: () => {
      toast({
        title: 'Package Deleted',
        description: 'The package has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete package. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (packageData: any) => createPackage(packageData),
    onSuccess: () => {
      toast({
        title: 'Package Created',
        description: 'The package has been created successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Creation Failed',
        description: error.message || 'Failed to create package. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updatePackage(id, data),
    onSuccess: (_, variables) => {
      toast({
        title: 'Package Updated',
        description: 'The package has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['package', variables.id] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update package. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
