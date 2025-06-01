import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            end = 4;
        }
        if (currentPage >= totalPages - 2) {
            start = totalPages - 3;
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <motion.div 
            className="flex justify-center items-center space-x-2 my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <button
                className="p-2 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            
            {getPageNumbers().map((number, index) => (
                number === '...' ? (
                <span
                    key={`ellipsis-${index}`}
                    className="w-10 h-10 flex items-center justify-center text-gray-500"
                >
                    ...
                </span>
                ) : (
                <motion.button
                    key={number}
                    className={`w-10 h-10 cursor-pointer rounded-md flex items-center justify-center ${
                    currentPage === number 
                        ? 'bg-black text-white' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => onPageChange(number as number)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {number}
                </motion.button>
                )
            ))}
            
            <button
                className="p-2 disabled:cursor-not-allowed cursor-pointer"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </motion.div>
    );
};

export default Pagination;