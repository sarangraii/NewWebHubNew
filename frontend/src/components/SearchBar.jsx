import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
      setSearch('');
      setIsOpen(false); // Close on mobile after search
    }
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <>
      {/* Mobile: Icon button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5 dark:text-white" />
      </button>

      {/* Mobile: Full-screen search overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 dark:text-white" />
            </button>
            <h2 className="text-lg font-semibold dark:text-white">Search News</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              autoFocus
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-colors text-base"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            {search && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </form>
        </div>
      )}

      {/* Desktop: Inline search */}
      <form onSubmit={handleSubmit} className="hidden md:block">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news..."
            className="pl-10 pr-10 py-2 w-64 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-colors"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchBar;