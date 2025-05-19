import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Package = Database['public']['Tables']['packages']['Row'];
type Hotel = Database['public']['Tables']['hotels']['Row'];
type Airline = Database['public']['Tables']['airlines']['Row'];
type Convention = Database['public']['Tables']['conventions']['Row'];
type Reservation = Database['public']['Tables']['reservations']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

// Packages
export const getPackages = async () => {
  const { data, error } = await supabase
    .from('packages')
    .select(`
      *,
      hotel:hotels(*),
      airline:airlines(*),
      convention:conventions(*)
    `);
  
  if (error) throw error;
  return data;
};

export const getPackageById = async (id: string) => {
  const { data, error } = await supabase
    .from('packages')
    .select(`
      *,
      hotel:hotels(*),
      airline:airlines(*),
      convention:conventions(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createPackage = async (packageData: Omit<Package, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('packages')
    .insert(packageData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePackage = async (id: string, packageData: Partial<Omit<Package, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('packages')
    .update(packageData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deletePackage = async (id: string) => {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// Hotels
export const getHotels = async () => {
  const { data, error } = await supabase
    .from('hotels')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getHotelById = async (id: string) => {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createHotel = async (hotelData: Omit<Hotel, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('hotels')
    .insert(hotelData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateHotel = async (id: string, hotelData: Partial<Omit<Hotel, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('hotels')
    .update(hotelData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteHotel = async (id: string) => {
  const { error } = await supabase
    .from('hotels')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// Airlines
export const getAirlines = async () => {
  const { data, error } = await supabase
    .from('airlines')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getAirlineById = async (id: string) => {
  const { data, error } = await supabase
    .from('airlines')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createAirline = async (airlineData: Omit<Airline, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('airlines')
    .insert(airlineData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateAirline = async (id: string, airlineData: Partial<Omit<Airline, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('airlines')
    .update(airlineData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteAirline = async (id: string) => {
  const { error } = await supabase
    .from('airlines')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// Reservations
export const getUserReservations = async (userId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      package:packages(*)
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

export const getUserReservation = async (id: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      package:packages(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Update the type for reservation creation to make booking_date optional
export const createReservation = async (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'booking_date'> & { booking_date?: string }) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert(reservation)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateReservation = async (id: string, reservationData: Partial<Omit<Reservation, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('reservations')
    .update(reservationData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteReservation = async (id: string) => {
  try {
    console.log('Starting deletion process for reservation:', id);

    // First, get the reservation to check its status, payment status, and user_id
    const { data: reservation, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching reservation:', fetchError);
      throw fetchError;
    }
    if (!reservation) {
      console.error('Reservation not found:', id);
      throw new Error('Reservation not found');
    }

    console.log('Found reservation:', {
      id: reservation.id,
      user_id: reservation.user_id,
      status: reservation.status,
      payment_status: reservation.payment_status
    });

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error('No authenticated user found');
      throw new Error('User not authenticated');
    }

    console.log('Current user:', user.id);

    // Verify the reservation belongs to the user
    if (reservation.user_id !== user.id) {
      console.error('Permission denied: User', user.id, 'trying to delete reservation belonging to', reservation.user_id);
      throw new Error('You do not have permission to delete this reservation');
    }

    // Verify the reservation can be deleted
    if (reservation.status !== 'cancelled' || reservation.payment_status !== 'unpaid') {
      console.error('Invalid reservation state:', {
        status: reservation.status,
        payment_status: reservation.payment_status
      });
      throw new Error('Only cancelled and unpaid reservations can be deleted');
    }

    console.log('Attempting to delete reservation...');

    // Delete the reservation - simplified query
    const { data: deleteData, error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)
      .select();  // Add select to get the deleted row
    
    if (deleteError) {
      console.error('Error during deletion:', {
        error: deleteError,
        code: deleteError.code,
        message: deleteError.message,
        details: deleteError.details
      });
      throw deleteError;
    }

    console.log('Delete response:', deleteData);

    // Verify the deletion was successful
    const { data: verifyReservation, error: verifyError } = await supabase
      .from('reservations')
      .select('id')
      .eq('id', id)
      .single();

    if (verifyError && verifyError.code !== 'PGRST116') {
      console.error('Error verifying deletion:', verifyError);
      throw verifyError;
    }

    if (verifyReservation) {
      console.error('Verification failed: Reservation still exists after deletion');
      throw new Error('Failed to delete reservation. Please try again.');
    }

    console.log('Deletion verified successfully');
    return { success: true };
  } catch (error: any) {
    console.error('Error in deleteReservation:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    throw error;
  }
};

// Reviews
export const createReview = async (review: Omit<Review, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getAllReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles(*),
      reservation:reservations(*)
    `);
  
  if (error) throw error;
  return data;
};

export const getReviewById = async (id: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      user:profiles(*),
      reservation:reservations(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteReview = async (id: string) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// User Profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Admin functions
export const setUserAdminStatus = async (userId: string, isAdmin: boolean) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Get all users (admin only)
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getAllReservations = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      package:packages(*),
      user:profiles(*)
    `);
  
  if (error) throw error;
  return data;
};
