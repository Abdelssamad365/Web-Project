
import { useQuery } from '@tanstack/react-query';
import { getPackages, getPackageById } from '@/services/api';

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
}

export function usePackageDetails(id: string) {
  return useQuery({
    queryKey: ['package', id],
    queryFn: () => getPackageById(id),
    enabled: !!id,
  });
}
