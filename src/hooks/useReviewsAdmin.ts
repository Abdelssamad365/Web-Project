
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/services/api';
import { toast } from '@/hooks/use-toast';

export function useDeleteReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      toast({
        title: 'Review Deleted',
        description: 'The review has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete review. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
