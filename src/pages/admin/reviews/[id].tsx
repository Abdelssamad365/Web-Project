
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useReviewDetails } from '@/hooks/useReviews';
import { useDeleteReview } from '@/hooks/useReviewsAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: review, isLoading } = useReviewDetails(id || '');
  const deleteReview = useDeleteReview();
  
  const handleDelete = () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      deleteReview.mutate(id, {
        onSuccess: () => {
          navigate('/admin/reviews');
        }
      });
    }
  };
  
  const renderRating = (rating: number | null, label: string) => {
    if (rating === null) return <div className="text-gray-400">No {label} rating provided</div>;
    
    return (
      <div className="flex items-center">
        <span className="mr-2">{label} Rating:</span>
        <div className="flex">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="ml-2 font-medium">{rating}/5</span>
      </div>
    );
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Review Details</h1>
            <Button variant="outline" onClick={() => navigate('/admin/reviews')}>
              Back to Reviews
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : !review ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              Review not found.
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>Review by {review.user?.first_name} {review.user?.last_name}</div>
                    <Badge className="ml-2">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Ratings</h3>
                      {renderRating(review.hotel_rating, 'Hotel')}
                      {renderRating(review.airline_rating, 'Airline')}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Reservation Details</h3>
                      <div><span className="font-medium">Reservation ID:</span> {review.reservation_id}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">Comments</h3>
                    <div className="p-4 bg-gray-50 rounded-lg mt-2">
                      {review.comments || 'No comments provided.'}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Review
                </Button>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ReviewDetail;
