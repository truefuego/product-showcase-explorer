import React, { useEffect, useState } from 'react'
import useProductsApi from '../api/useProductsApi';
import type { ProductData } from '../interface/ProductsData';
import ScreenWrapper from '../components/ScreenWrapper';
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
        const fetchAndSortAllProducts = async () => {
            let allProducts: ProductData[] = [];
            let totalProducts = 0;

            if (filters.category) {
                const response = await getPaginatedProductsByCategory(0, 1000, filters.category);
                    allProducts = [...response.data.products];
                    totalProducts = response.data.total;
            } else {
                const response = await getPaginatedProducts(0, 1000);
                allProducts = [...response.data.products];
                totalProducts = response.data.total;
            }

            setTotal(totalProducts);

            if (filters.sort) {
                switch (filters.sort) {
                    case 'price-low-high':
                        allProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high-low':
                        allProducts.sort((a, b) => b.price - a.price);
                        break;
                    case 'a-z':
                        allProducts.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    case 'z-a':
                        allProducts.sort((a, b) => b.title.localeCompare(a.title));
                        break;
                }
            }

            const skip = (currentPage - 1) * filters.itemsPerPage;
            const paginatedProducts = allProducts.slice(skip, skip + filters.itemsPerPage);
            setProductListData(paginatedProducts);
        };

        if (filters.sort) {
            fetchAndSortAllProducts();
        } else if (filters.category !== '') {
            fetchCategoryProducts();
        } else {
            fetchProductsData();
        }

        if (currentPage > 1 && currentPage > Math.ceil(total / filters.itemsPerPage)) {
            setCurrentPage(1);
        }
    }, [
        getPaginatedProducts,
        getPaginatedProductsByCategory,
        currentPage,
        filters.itemsPerPage,
        filters.category,
        total,
        filters.sort
    ]);


    useEffect(() => {
        setCurrentPage(1);
    }
    , [filters.category]);

    useEffect(() => {

    }, [filters.sort, productsListData]);
    
    const handleFilterChange = (newFilters: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const totalPages = Math.ceil(total / filters.itemsPerPage);

    return (
        <ScreenWrapper>
            <main className='max-w-7xl px-4 py-8'>
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
