import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHotels } from '@/hooks/useHotels';
import { useAirlines } from '@/hooks/useAirlines';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const packageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  destination: z.string().min(1, 'Destination is required').max(100, 'Destination must be less than 100 characters'),
  price: z.string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Price must be greater than 0'),
  available_slots: z.string()
    .min(1, 'Available slots are required')
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, 'Available slots must be greater than 0'),
  start_date: z.date()
    .min(new Date(), 'Start date must be in the future'),
  end_date: z.date()
    .min(new Date(), 'End date must be in the future'),
  hotel_id: z.string().optional(),
  airline_id: z.string().optional(),
  image_url: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
}).refine((data) => {
  if (data.start_date && data.end_date) {
    return data.end_date > data.start_date;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["end_date"],
});

type PackageFormValues = z.infer<typeof packageSchema>;

interface PackageFormProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const PackageForm = ({ initialValues, onSubmit, isLoading }: PackageFormProps) => {
  const { data: hotels } = useHotels();
  const { data: airlines } = useAirlines();

  const defaultValues: PackageFormValues = initialValues ? {
    ...initialValues,
    price: initialValues.price?.toString() || '',
    available_slots: initialValues.available_slots?.toString() || '',
    start_date: initialValues.start_date ? new Date(initialValues.start_date) : new Date(),
    end_date: initialValues.end_date ? new Date(initialValues.end_date) : new Date(),
    hotel_id: initialValues.hotel_id || 'none',
    airline_id: initialValues.airline_id || 'none',
  } : {
    title: '',
    description: '',
    destination: '',
    price: '',
    available_slots: '',
    start_date: new Date(),
    end_date: new Date(),
    hotel_id: 'none',
    airline_id: 'none',
    image_url: '',
  };

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues,
  });

  const handleSubmit = (values: PackageFormValues) => {
    const formData = {
      ...values,
      price: parseFloat(values.price),
      available_slots: parseInt(values.available_slots, 10),
      hotel_id: values.hotel_id === 'none' ? null : values.hotel_id,
      airline_id: values.airline_id === 'none' ? null : values.airline_id,
    };
    
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter package title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter package description" 
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (USD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    placeholder="Enter price" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="available_slots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Slots</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    placeholder="Enter number of available slots" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const startDate = form.getValues('start_date');
                        return date < (startDate || new Date());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="hotel_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hotel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {hotels?.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id}>
                        {hotel.name} - {hotel.city}, {hotel.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="airline_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Airline</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an airline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {airlines?.map((airline) => (
                      <SelectItem key={airline.id} value={airline.id}>
                        {airline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <div className="flex justify-end gap-2">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-ocean hover:bg-ocean-dark"
          >
            {isLoading ? "Saving..." : initialValues ? "Update Package" : "Create Package"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PackageForm;
