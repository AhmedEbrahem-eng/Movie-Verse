import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder = 'Search for movies...',
  initialQuery = '',
  onSearch,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search 
          className="w-5 h-5 text-gray-400" 
          aria-hidden="true"
        />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full py-2 pl-10 pr-10 border border-gray-300 rounded-full 
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
          bg-white dark:bg-dark-800 dark:border-dark-600 dark:text-white
          ${isFocused ? 'shadow-md' : ''} transition-shadow`}
      />
      
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;