
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updates: any) => updateUserProfile(user!.id, updates),
    onSuccess: () => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: 'Update Failed',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    },
  });
}

export function useIsAdmin() {
  const { user } = useAuth();
  const { data: profile } = useUserProfile();
  
  return {
    isAdmin: !!profile?.is_admin,
    isLoading: !profile && !!user,
  };
}
