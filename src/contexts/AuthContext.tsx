import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          // Check if email is verified
          if (session?.user && !session.user.email_confirmed_at) {
            // Sign out if email is not verified
            await supabase.auth.signOut();
            toast({
              title: "Email not verified",
              description: "Please verify your email address before logging in.",
              variant: "destructive"
            });
            return;
          }
          
          setSession(session);
          setUser(session?.user ?? null);
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in."
          });
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          toast({
            title: "Signed out",
            description: "You have been signed out."
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user && !session.user.email_confirmed_at) {
        // Sign out if email is not verified
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setIsLoading(false);
        return { error };
      }

      // Check if email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        // Sign out the user immediately
        await supabase.auth.signOut();
        setIsLoading(false);
        return { 
          error: { 
            message: 'Please verify your email address before logging in. Check your inbox for the confirmation link.' 
          } 
        };
      }

      setIsLoading(false);
      return { error: null };
    } catch (error) {
      setIsLoading(false);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      });
      
      if (error) {
        setIsLoading(false);
        return { error };
      }

      // Sign out the user immediately after signup
      await supabase.auth.signOut();
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to confirm your account. You won't be able to log in until you verify your email address.",
      });
      
      setIsLoading(false);
      return { error: null };
    } catch (error) {
      setIsLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
