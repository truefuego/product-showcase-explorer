import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { ProductData } from '../interface/ProductsData';

interface ProductGridProps {
  products: ProductData[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </motion.div>
    );
};

export default ProductGrid;
