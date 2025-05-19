import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getUserReservation, createReview } from '@/services/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Slider } from '@/components/ui/slider';

const reviewFormSchema = z.object({
  comments: z.string().min(10, 'Please provide more detailed feedback'),
  hotel_rating: z.number().min(1).max(5),
  airline_rating: z.number().min(1).max(5),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

const AddReview = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: reservation, isLoading } = useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getUserReservation(id!),
    enabled: !!id,
  });
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      hotel_rating: 5,
      airline_rating: 5,
    },
  });
  
  const createReviewMutation = useMutation({
    mutationFn: (data: ReviewFormData) => createReview({
      ...data,
      reservation_id: id!,
      user_id: user!.id,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservation', id] });
      toast({
        title: 'Review Submitted',
        description: 'Thank you for your feedback!',
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: ReviewFormData) => {
    createReviewMutation.mutate(data);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500 mb-4">Reservation not found.</p>
              <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (reservation.status !== 'completed') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500 mb-4">You can only leave a review for completed reservations.</p>
              <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Write a Review</h1>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{reservation.package?.title}</CardTitle>
                <CardDescription>{reservation.package?.destination}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Dates: {new Date(reservation.package?.start_date).toLocaleDateString()} - {new Date(reservation.package?.end_date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Feedback</CardTitle>
                <CardDescription>Share your experience with us</CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Hotel Rating</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[watch('hotel_rating')]}
                          onValueChange={([value]) => setValue('hotel_rating', value)}
                          min={1}
                          max={5}
                          step={1}
                          className="w-full"
                        />
                        <span className="text-sm font-medium">{watch('hotel_rating')}/5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Airline Rating</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[watch('airline_rating')]}
                          onValueChange={([value]) => setValue('airline_rating', value)}
                          min={1}
                          max={5}
                          step={1}
                          className="w-full"
                        />
                        <span className="text-sm font-medium">{watch('airline_rating')}/5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="comments">Comments</Label>
                      <Textarea
                        id="comments"
                        {...register('comments')}
                        placeholder="Share your experience..."
                        rows={5}
                      />
                      {errors.comments && (
                        <p className="text-sm text-red-500">{errors.comments.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createReviewMutation.isPending}
                  >
                    {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AddReview; 