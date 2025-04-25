import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 10,
  size = 'md',
  showValue = true,
  className = '',
}) => {
  // Convert to a scale of 5 stars
  const normalizedValue = (value / max) * 5;
  
  const sizeClasses = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  };

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const getStarColor = (index: number) => {
    const threshold = normalizedValue - index;
    
    if (threshold >= 1) return 'text-yellow-400'; // Full star
    if (threshold > 0 && threshold < 1) return 'text-yellow-300'; // Partial star
    return 'text-gray-300'; // Empty star
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex mr-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            className={`${getStarColor(index)} transition-colors`}
            size={starSizes[size]}
            fill={normalizedValue > index ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      {showValue && (
        <span className={`${sizeClasses[size]} font-medium text-gray-700 ml-1`}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;