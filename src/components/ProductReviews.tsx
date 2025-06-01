import React from 'react';
import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import type { ProductData } from '../interface/ProductsData';
import { formatDate } from '../utils/utils';

interface ProductReviewsProps {
  product: ProductData;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {

  const ratingCounts = [0, 0, 0, 0, 0];
  
  product.reviews.forEach(review => {
    const ratingIndex = Math.floor(review.rating) - 1;
    if (ratingIndex >= 0 && ratingIndex < 5) {
      ratingCounts[4 - ratingIndex]++;
    }
  });
  
  return (
    <div>
        <span className='text-3xl font-bold'>Reviews</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        <div className="col-span-1 bg-white px-6 py-2 rounded-2xl shadow-md flex flex-col h-fit">
          <div className="text-center md:text-left flex items-end justify-between">
            <div className="mt-2">
            <h3 className="text-3xl font-bold text-gray-900">{product.rating.toFixed(1)}</h3>
                <RatingStars rating={product.rating} size="lg" showCount={false} />
            </div>
            <div>
                <p className="mt-1 text-xl text-gray-500">{product.reviews.length}</p>
                <p className="mt-1 text-sm text-gray-500">Total reviews</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center">
                <span className="text-sm text-gray-600 w-3">{star}</span>
                <div className="ml-2 flex items-center">
                  <motion.div 
                    className="h-2 bg-gray-200 rounded-full overflow-hidden w-36 md:w-24 lg:w-36"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <motion.div 
                      className="h-full bg-[#62CBFF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(ratingCounts[index] / product?.reviews?.length) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                    />
                  </motion.div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{ratingCounts[index]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <motion.div 
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-600">{review.reviewerName}</h4>
                  <span className="text-gray-900">{formatDate(review.date)}</span>
                </div>
                
                <div className="mt-1">
                  <RatingStars rating={review.rating} size="sm" />
                </div>
                
                <p className="mt-3 font-medium text-lg text-gray-900">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;