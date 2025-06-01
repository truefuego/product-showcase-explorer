import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IProductImageCarouselProps {
  images: string[];
}

const ProductImageCarousel: React.FC<IProductImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

    return (
        <div className="md:w-1/3 p-4">
            <div className="relative rounded-2xl shadow-sm overflow-hidden bg-gray-100 aspect-square">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Product image ${currentIndex + 1}`}
                        className="object-cover pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>
                
                <motion.button
                    className="absolute left-2 top-1/2 cursor-pointer shadow -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white"
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft size={20} />
                </motion.button>
                
                <motion.button
                    className="absolute right-2 top-1/2 cursor-pointer shadow -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white"
                    onClick={handleNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight size={20} />
                </motion.button>
            </div>
        
            <div className="mt-4 flex justify-center space-x-2">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`w-2 h-2 rounded-full ${
                        currentIndex === index ? 'bg-emerald-500 w-4' : 'bg-gray-300'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                    />
                ))}
            </div>
      
            <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`rounded-md overflow-hidden border-2 ${
                        currentIndex === index ? 'border-emerald-500' : 'border-transparent'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover aspect-square"
                        />
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ProductImageCarousel;
