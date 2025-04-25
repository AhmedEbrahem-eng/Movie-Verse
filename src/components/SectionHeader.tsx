import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  viewAllLink,
  viewAllText = 'View All',
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="w-5 h-5 ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;