
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

const airlineSchema = z.object({
  name: z.string().min(1, 'Airline name is required'),
  logo_url: z.string().optional(),
  description: z.string().optional(),
});

type AirlineFormValues = z.infer<typeof airlineSchema>;

interface AirlineFormProps {
  initialValues?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const AirlineForm = ({ initialValues, onSubmit, isLoading }: AirlineFormProps) => {
  const defaultValues: AirlineFormValues = initialValues || {
    name: '',
    logo_url: '',
    description: '',
  };

  const form = useForm<AirlineFormValues>({
    resolver: zodResolver(airlineSchema),
    defaultValues,
  });

  const handleSubmit = (values: AirlineFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Airline Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter airline name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter logo URL (optional)" {...field} />
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
                  placeholder="Enter airline description (optional)" 
                  className="min-h-[120px]" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialValues ? "Update Airline" : "Create Airline"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AirlineForm;
