
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * Checks if the current user has admin privileges
 */
export const checkIsAdmin = async () => {
  const { data, error } = await supabase.rpc('is_admin');
  
  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
  
  return data || false;
};

/**
 * Handles user authentication errors with toasts
 */
export const handleAuthError = (error: any, action: string) => {
  console.error(`Auth error during ${action}:`, error);
  
  let message = 'An unexpected error occurred. Please try again.';
  
  if (error?.message) {
    // Handle common authentication errors with user-friendly messages
    if (error.message.includes('Email not confirmed')) {
      message = 'Please verify your email address before logging in.';
    } else if (error.message.includes('Invalid login credentials')) {
      message = 'Invalid email or password. Please try again.';
    } else if (error.message.includes('User already registered')) {
      message = 'This email is already registered. Try logging in instead.';
    } else if (error.message.toLowerCase().includes('network')) {
      message = 'Network error. Please check your connection and try again.';
    } else {
      message = error.message;
    }
  }
  
  toast({
    title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
    description: message,
    variant: 'destructive',
  });
  
  return { error: { message } };
};
