import React, { useEffect, useState } from 'react'
import useProductsApi from '../api/useProductsApi';
import type { ProductData } from '../interface/ProductsData';
import ScreenWrapper from '../components/ScreenWrapper';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import type { FilterState } from '../components/types';
import FilterSidebar from '../components/FilterSidebar';
import { useHttpMethodContext } from '../context/httpContext';
import SkeletonProductCard from '../components/SkeletonProductCard';

const HomePage:React.FC = () => {
    const { showApiLoader } = useHttpMethodContext();
    const { getPaginatedProducts, getPaginatedProductsByCategory } = useProductsApi();

    const [productsListData, setProductListData] = useState<ProductData[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [filters, setFilters] = useState<FilterState>({
        itemsPerPage: 10,
        sort: null,
        category: '',
    });
    
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProductsData = async () => {
            const skip = (currentPage - 1) * filters.itemsPerPage;
            const limit = filters.itemsPerPage;
            const response = await getPaginatedProducts(skip, limit);
            setTotal(response.data.total);
            setProductListData(response.data.products);
        }; 
        const fetchCategoryProducts = async () => {
            const skip = (currentPage - 1) * filters.itemsPerPage;
            const limit = filters.itemsPerPage;
            const response = await getPaginatedProductsByCategory(skip, limit, filters.category);
            setTotal(response.data.total);
            setProductListData(response.data.products);
        }
        if (filters.category !== '') {
            fetchCategoryProducts();
        } else {
            fetchProductsData();
        }
    }, [getPaginatedProducts, getPaginatedProductsByCategory, currentPage, filters.itemsPerPage, filters.category]);


    useEffect(() => {
        setCurrentPage(1); // Reset to first page when filters change
    }
    , [filters.category]);

    // Apply filters and sorting
    // useEffect(() => {
    //     let result = [...productsListData];
        
    //     // Apply sorting
    //     if (filters.sort) {
    //         switch (filters.sort) {
    //             case 'price-low-high':
    //                 result.sort((a, b) => a.price - b.price);
    //                 break;
    //             case 'price-high-low':
    //                 result.sort((a, b) => b.price - a.price);
    //                 break;
    //             case 'a-z':
    //                 result.sort((a, b) => a.title.localeCompare(b.title));
    //                 break;
    //             case 'z-a':
    //                 result.sort((a, b) => b.title.localeCompare(a.title));
    //                 break;
    //         }
    //     }
        
    // }, [filters, productsListData]);
    
    const handleFilterChange = (newFilters: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };
    
    // Pagination logic
    const totalPages = Math.ceil(total / filters.itemsPerPage);

    return (
        <ScreenWrapper>
            <main className='max-w-7xl px-4 py-8'>
                <motion.h2 
                    className="text-3xl font-bold text-gray-800 mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    Shop Premium Beauty Products
                </motion.h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                    <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                    
                    <div className="flex-1">
                        {showApiLoader ? (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: filters.itemsPerPage }).map((_, idx) => (
                                    <React.Fragment key={idx}>
                                        <SkeletonProductCard />
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            <ProductGrid products={productsListData} />
                        )}
                        
                        {totalPages > 1 && (
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={setCurrentPage} 
                            />
                        )}
                    </div>
                </div>
            </main>
        </ScreenWrapper>
    )
}

export default HomePage;
