import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { ProductData } from '../interface/ProductsData';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const originalPrice = product.price / (1 - product.discountPercentage / 100);

    const handleNavigation = (path: string) => {
        navigate(path)
    };

    return (
        <motion.div 
            className="rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleNavigation(`/${product.id}`)}
        >
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <motion.img 
                src={product.thumbnail} 
                alt={product.title}
                className="w-full h-full object-cover bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                />
            </div>
            <div className="p-4 mb-4">
                <p className="text-xl font-semibold">{product.title}</p>
                <div className="flex justify-between items-center mt-2">
                    <div className='flex gap-2 items-baseline'>
                        <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.discountPercentage.toFixed(0) !== "0" && (<><span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
                        <span className="text-md font-medium text-red-600">-{product.discountPercentage.toFixed(0)}%</span></>)}
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-700 mr-1">{product.rating}</span>
                        <Star className="w-4 h-4 text-black fill-current" />
                    </div>
                </div>
                <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {product.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
