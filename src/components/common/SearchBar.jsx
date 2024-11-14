// src/components/common/SearchBar.jsx
import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import useDebounce from '../../hooks/useDebounce';

const SearchBar = ({ onSearch, initialValue = '', placeholder = 'Buscar...' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef(null);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-cinema-gray border border-gray-700 rounded-lg
                    text-white placeholder-gray-400 focus:outline-none focus:border-cinema-red
                    focus:ring-1 focus:ring-cinema-red"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                      hover:text-white transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
