import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FilterAccordionProps {
  title: string;
  children: React.ReactNode;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-4">
            <button 
                className="flex items-center justify-between w-full py-2 text-left text-sm font-bold text-gray-700 focus:outline-none cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>
            
            <AnimatePresence>
                {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="pt-2 pb-4">{children}</div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterAccordion;