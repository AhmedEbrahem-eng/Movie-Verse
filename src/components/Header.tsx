import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Menu, X, Search as SearchIcon, Heart, Home } from 'lucide-react';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // Determine active nav item
  const getNavItemClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center px-4 py-2 rounded-md transition-colors ${
      isActive 
        ? 'text-accent-500 font-medium' 
        : 'text-gray-700 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400'
    }`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-accent-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MovieVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={getNavItemClasses('/')}>
              <Home className="w-5 h-5 mr-1" />
              Home
            </Link>
            <Link to="/genres" className={getNavItemClasses('/genres')}>
              Genres
            </Link>
            <Link to="/favorites" className={getNavItemClasses('/favorites')}>
              <Heart className="w-5 h-5 mr-1" />
              Favorites
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:block w-64 lg:w-80">
            <SearchBar />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center md:hidden space-x-2">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300"
              aria-label="Search"
            >
              <SearchIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-800 shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link to="/" className="py-2 px-3 flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/genres" className="py-2 px-3 flex items-center space-x-2">
              <span>Genres</span>
            </Link>
            <Link to="/favorites" className="py-2 px-3 flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;