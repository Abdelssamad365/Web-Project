import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFormProps {
  className?: string;
  onSearch?: (searchParams: SearchParams) => void;
}

interface SearchParams {
  destination: string;
  dateFrom: string;
  dateTo: string;
  travelers: number;
}

const MAX_TRAVELERS = 8;
const MIN_TRAVELERS = 1;

const SearchForm: React.FC<SearchFormProps> = ({ className, onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: '',
    dateFrom: '',
    dateTo: '',
    travelers: MIN_TRAVELERS,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SearchParams, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SearchParams, string>> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!searchParams.destination.trim()) {
      newErrors.destination = 'Please enter a destination';
    }

    if (!searchParams.dateFrom) {
      newErrors.dateFrom = 'Please select a check-in date';
    } else if (new Date(searchParams.dateFrom) < today) {
      newErrors.dateFrom = 'Check-in date cannot be in the past';
    }

    if (!searchParams.dateTo) {
      newErrors.dateTo = 'Please select a check-out date';
    } else if (new Date(searchParams.dateTo) <= new Date(searchParams.dateFrom)) {
      newErrors.dateTo = 'Check-out date must be after check-in date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof SearchParams]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && onSearch) {
      onSearch(searchParams);
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-6", className)}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="destination"
                type="text"
                name="destination"
                value={searchParams.destination}
                onChange={handleChange}
                placeholder="Where would you like to go?"
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent",
                  errors.destination ? "border-red-500" : "border-gray-300"
                )}
                aria-invalid={!!errors.destination}
                aria-describedby={errors.destination ? "destination-error" : undefined}
              />
              {errors.destination && (
                <p id="destination-error" className="mt-1 text-sm text-red-500">
                  {errors.destination}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
              Check In
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="dateFrom"
                type="date"
                name="dateFrom"
                value={searchParams.dateFrom}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent",
                  errors.dateFrom ? "border-red-500" : "border-gray-300"
                )}
                aria-invalid={!!errors.dateFrom}
                aria-describedby={errors.dateFrom ? "dateFrom-error" : undefined}
              />
              {errors.dateFrom && (
                <p id="dateFrom-error" className="mt-1 text-sm text-red-500">
                  {errors.dateFrom}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
              Check Out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="dateTo"
                type="date"
                name="dateTo"
                value={searchParams.dateTo}
                onChange={handleChange}
                min={searchParams.dateFrom || new Date().toISOString().split('T')[0]}
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent",
                  errors.dateTo ? "border-red-500" : "border-gray-300"
                )}
                aria-invalid={!!errors.dateTo}
                aria-describedby={errors.dateTo ? "dateTo-error" : undefined}
              />
              {errors.dateTo && (
                <p id="dateTo-error" className="mt-1 text-sm text-red-500">
                  {errors.dateTo}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
              Travelers
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                id="travelers"
                name="travelers"
                value={searchParams.travelers}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent appearance-none"
              >
                {Array.from({ length: MAX_TRAVELERS }, (_, i) => i + MIN_TRAVELERS).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            type="submit" 
            className="w-full bg-ocean hover:bg-ocean-dark text-white"
          >
            Search Packages
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
