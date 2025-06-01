import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  totalStars = 5,
  size = 'md',
  showCount = false
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  const sizeClass = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const textSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(totalStars)].map((_, i) => (
          <motion.span 
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {i < fullStars ? (
              <Star className={`${sizeClass[size]} text-black fill-black`} />
            ) : i === fullStars && hasHalfStar ? (
              <div className="relative">
                <Star className={`${sizeClass[size]} text-gray-300 fill-gray-300`} />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star className={`${sizeClass[size]} text-black fill-black`} />
                </div>
              </div>
            ) : (
              <Star className={`${sizeClass[size]} text-gray-300 fill-gray-300`} />
            )}
          </motion.span>
        ))}
      </div>
      
      {showCount && (
        <span className={`ml-2 text-gray-600 ${textSizeClass[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;