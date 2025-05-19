
import { useQuery } from '@tanstack/react-query';
import { getAirlines, getAirlineById } from '@/services/api';

export function useAirlines() {
  return useQuery({
    queryKey: ['airlines'],
    queryFn: getAirlines,
  });
}

export function useAirlineDetails(id: string) {
  return useQuery({
    queryKey: ['airline', id],
    queryFn: () => getAirlineById(id),
    enabled: !!id,
  });
}
