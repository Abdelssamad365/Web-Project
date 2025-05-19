
import { useQuery } from '@tanstack/react-query';
import { getHotels, getHotelById } from '@/services/api';

export function useHotels() {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: getHotels,
  });
}

export function useHotelDetails(id: string) {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotelById(id),
    enabled: !!id,
  });
}
