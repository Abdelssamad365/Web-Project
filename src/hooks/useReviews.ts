
import { useQuery } from '@tanstack/react-query';
import { getAllReviews, getReviewById } from '@/services/api';
import { useIsAdmin } from './useProfile';

export function useReviews() {
  const { isAdmin } = useIsAdmin();
  
  return useQuery({
    queryKey: ['admin-reviews'],
    queryFn: getAllReviews,
    enabled: isAdmin,
  });
}

export function useReviewDetails(id: string) {
  const { isAdmin } = useIsAdmin();
  
  return useQuery({
    queryKey: ['review', id],
    queryFn: () => getReviewById(id),
    enabled: !!id && isAdmin,
  });
}
