
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const hotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  address: z.string().optional(),
  description: z.string().optional(),
  star_rating: z.string().optional(),
  image_url: z.string().optional(),
});

type HotelFormValues = z.infer<typeof hotelSchema>;

interface HotelFormProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const HotelForm = ({ initialValues, onSubmit, isLoading }: HotelFormProps) => {
  const defaultValues: HotelFormValues = initialValues ? {
    ...initialValues,
    star_rating: initialValues.star_rating?.toString() || '',
  } : {
    name: '',
    city: '',
    country: '',
    address: '',
    description: '',
    star_rating: '',
    image_url: '',
  };

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelSchema),
    defaultValues,
  });

  const handleSubmit = (values: HotelFormValues) => {
    const formData = {
      ...values,
      star_rating: values.star_rating ? parseInt(values.star_rating, 10) : null,
    };
    
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter hotel name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter hotel description (optional)" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="star_rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Star Rating</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter star rating (1-5)" 
                    min="1" 
                    max="5" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialValues ? "Update Hotel" : "Create Hotel"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HotelForm;
