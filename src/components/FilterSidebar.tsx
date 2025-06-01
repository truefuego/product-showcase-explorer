import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FilterAccordion from './FilterAccordian';
import type { FilterState, ISortOption, ItemsPerPageOption } from './types';
import type { ICategoryProps } from '../interface/ProductsData';
import useProductsApi from '../api/useProductsApi';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
    const { getCategories } = useProductsApi();

    const handleItemsPerPageChange = (value: ItemsPerPageOption) => {
        onFilterChange({ itemsPerPage: value });
    };

    const handleSortChange = (value: ISortOption) => {
        onFilterChange({ sort: value });
    };
    const handleCategoryChange = (category: string) => {
        const newCategories =
            filters.category === category ? '' : category;
        onFilterChange({ category: newCategories });
    };

    const [categoriesList, setCategoriesList] = useState<ICategoryProps[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategoriesList(categories.data);
        };
        fetchCategories();
    }, [getCategories]);

    return (
    <motion.aside 
      className="w-full md:w-64 p-4 h-fit"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-medium text-lg mb-4 pointer-events-none">Shop all</h2>
      
      <FilterAccordion title="Items Per Page">
        {[5, 10, 20, 30].map((value) => (
          <div key={value} className="flex items-center mb-2">
            <input
              type="radio"
              id={`items-${value}`}
              name="itemsPerPage"
              checked={filters.itemsPerPage === value}
              onChange={() => handleItemsPerPageChange(value as ItemsPerPageOption)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor={`items-${value}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
              {value}
            </label>
          </div>
        ))}
      </FilterAccordion>
      
      <FilterAccordion title="Filter">
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="price-low-high"
            name="sort"
            checked={filters.sort === 'price-low-high'}
            onChange={() => handleSortChange('price-low-high')}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="price-low-high" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Price: Low to High
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="price-high-low"
            name="sort"
            checked={filters.sort === 'price-high-low'}
            onChange={() => handleSortChange('price-high-low')}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="price-high-low" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Price: High To Low
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="a-z"
            name="sort"
            checked={filters.sort === 'a-z'}
            onChange={() => handleSortChange('a-z')}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="a-z" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Alphabet: a to z
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="z-a"
            name="sort"
            checked={filters.sort === 'z-a'}
            onChange={() => handleSortChange('z-a')}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="z-a" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Alphabet: z to a
          </label>
        </div>
      </FilterAccordion>
      
      <FilterAccordion title="Categories">
        {categoriesList.map((category) => (
          <div key={category.slug} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={filters.category === category.name}
              onChange={() => handleCategoryChange(category.name)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor={`category-${category.name}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
              {category.name}
            </label>
          </div>
        ))}
      </FilterAccordion>
    </motion.aside>
  );
};

export default FilterSidebar;