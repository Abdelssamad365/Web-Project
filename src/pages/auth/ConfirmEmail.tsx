import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'signup') {
          throw new Error('Invalid verification link');
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) throw error;

        setIsVerified(true);
        toast({
          title: "Email verified successfully!",
          description: "You can now log in to your account.",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      } catch (error) {
        console.error('Error verifying email:', error);
        toast({
          title: "Verification failed",
          description: "The verification link is invalid or has expired. Please try signing up again.",
          variant: "destructive"
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container-custom py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
            <CardDescription className="text-center">
              {isVerifying ? 'Verifying your email...' : isVerified ? 'Email verified successfully!' : 'Verification failed'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              {isVerifying ? (
                <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
              ) : isVerified ? (
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              ) : (
                <XCircle className="w-12 h-12 text-red-500" />
              )}
              
              {!isVerifying && !isVerified && (
                <Button
                  onClick={() => navigate('/auth/register')}
                  className="w-full"
                >
                  Sign Up Again
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
} 