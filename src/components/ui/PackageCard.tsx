import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  id: string;
  title: string;
  destination: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  featured?: boolean;
  className?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  title,
  destination,
  image,
  price,
  duration,
  rating,
  featured = false,
  className
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Link to={`/packages/${id}`} className="block">
      <div 
        className={cn(
          "bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg", 
          featured && "border-2 border-ocean",
          className
        )}
      >
        <div className="relative">
          <img 
            src={image} 
            alt={`${title} - ${destination}`} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-ocean text-white text-xs font-bold px-2 py-1 rounded-md">
              Featured
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-semibold text-lg line-clamp-1">{title}</h3>
            <p className="text-white/90 text-sm line-clamp-1">{destination}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">{duration}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-ocean">{formattedPrice}</span>
              <span className="text-sm text-gray-500 ml-1">per person</span>
            </div>
            <span className="text-sm text-ocean font-medium hover:underline">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
