
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useReviews } from '@/hooks/useReviews';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash, Star } from 'lucide-react';
import { useDeleteReview } from '@/hooks/useReviewsAdmin';
import { toast } from '@/hooks/use-toast';

const ReviewsAdmin = () => {
  const { data: reviews, isLoading, error } = useReviews();
  const deleteReview = useDeleteReview();
  const navigate = useNavigate();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      deleteReview.mutate(id);
    }
  };
  
  const handleView = (id: string) => {
    navigate(`/admin/reviews/${id}`);
  };
  
  const renderRating = (rating: number | null) => {
    if (rating === null) return 'N/A';
    
    return (
      <div className="flex items-center">
        <span className="mr-1">{rating}</span>
        <Star className={`h-4 w-4 ${rating > 3 ? 'text-yellow-400' : 'text-gray-400'}`} />
      </div>
    );
  };
  
  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Review Management</h1>
            <Button variant="outline" onClick={() => navigate('/admin')}>Back to Admin</Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              An error occurred while loading reviews.
            </div>
          ) : (
            <Table>
              <TableCaption>List of all customer reviews</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Reservation</TableHead>
                  <TableHead>Hotel Rating</TableHead>
                  <TableHead>Airline Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews?.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {review.user?.first_name} {review.user?.last_name || ''}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="truncate max-w-[150px]">
                        {review.reservation_id}
                      </Badge>
                    </TableCell>
                    <TableCell>{renderRating(review.hotel_rating)}</TableCell>
                    <TableCell>{renderRating(review.airline_rating)}</TableCell>
                    <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleView(review.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ReviewsAdmin;
