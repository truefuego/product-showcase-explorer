import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper';
import { motion } from 'framer-motion';
import ProductImageCarousel from '../components/ProductImageCarousel';
import useProductsApi from '../api/useProductsApi';
import type { ProductData } from '../interface/ProductsData';
import ProductReviews from '../components/ProductReviews';


const ProductDetails:React.FC = () => {
  const { getProductById } = useProductsApi();
  const productId = window.location.pathname.split('/').pop();
  const [product, setProduct] = useState<ProductData>({} as ProductData);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const response = await getProductById(parseInt(productId));
        console.log(JSON.stringify(response));
        setProduct(response.data);
      }
    };
    fetchProduct();
  }, [getProductById, productId]);

  if(!product || Object.keys(product).length === 0) {
    return (
      <ScreenWrapper>
        <div className="container h-screen w-screen flex items-center justify-center mx-auto px-4 py-8">
          <motion.h1 
            className="text-3xl font-bold mb-4"
          >
            Loading...
          </motion.h1>
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <div className="container mx-auto px-8 py-4 flex flex-col lg:flex-row gap-12">
          {product.images !== undefined && <ProductImageCarousel images={product.images} />}
        
        <div>
          <motion.h1 
            className="text-3xl mt-4 font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.title}
          </motion.h1>
          
          <div className="flex items-center mb-4">
            <span className="text-medium font-bold text-gray-700 mr-1">{product.rating}</span>
            <svg className="w-4 h-4 text-black fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568L24 9.167l-6.084 5.909L19.336 24l-6.336-3.333L6.664 24l1.42-8.924L2 9.167l8.332-1.012L12 .587z"/></svg>
            <span className="text-sm text-gray-600 ml-4">({product?.reviews?.length} reviews)</span>
          </div>
          
          <motion.p 
            className="text-gray-900 font-medium text-lg mb-6 md:max-w-[600px] mx-w-[350px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.description}
          </motion.p>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.discountPercentage.toString() !== '0' && (
              <>
                <span className="text-sm text-gray-500 line-through ml-2">${(product.price / (1 - product?.discountPercentage / 100)).toFixed(2)}</span>
                <span className="text-md font-medium text-red-600 ml-2">-{product?.discountPercentage?.toFixed(0)}%</span>
              </>
            )}
          </div>
          
          <div className="mt-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          <div className='mt-4 text-gray-700'>
            Brand: <span className="font-medium text-gray-700">{product.brand}</span>
          </div>
          <div className='mt-2 text-gray-600'>
            In Stock: <span className="font-medium">{product.stock}</span>
          </div>
          <div>
            <motion.button 
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Add to Cart
            </motion.button>
          </div>
          <div className='flex items-center mt-4 gap-2'>
            <span className='text-gray-800 font-semibold text-sm'>{product.warrantyInformation}</span>
            <span >|</span>
            <span className='text-gray-800 font-semibold text-sm'>{product.shippingInformation}</span>
            <span >|</span>
            <span className='text-gray-800 font-semibold text-sm'>{product.returnPolicy}</span>
          </div>
        </div>
        
      </div>
      <ProductReviews product={product} />
    </ScreenWrapper>
  )
}

export default ProductDetails;
