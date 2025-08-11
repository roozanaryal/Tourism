import { RiGlobalFill } from "react-icons/ri";
import { IoSearch, IoClose } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useState, useRef, useEffect } from 'react';
import { useSocketContext } from '../../hooks/useSocketContext';

function CommunityHead() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const { onlineUsers } = useSocketContext();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target) && 
          !event.target.closest('.search-icon')) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-24 flex items-center justify-between px-6 bg-gradient-to-r from-primarycolor/5 to-transparent">
      {/* Left Section - Global Chat Info */}
      <div className="flex items-center gap-4 z-10 group">
        <div className="p-2 rounded-full group-hover:bg-primarycolor/10 transition-colors duration-200">
          <RiGlobalFill className="text-3xl text-primarycolor group-hover:scale-110 transition-transform duration-200" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg text-gray-800 group-hover:text-primarycolor transition-colors duration-200">Global Chat</div>
          <div className="text-sm text-gray-600">Online: {onlineUsers?.length || 0}</div>
        </div>
      </div>
      
      {/* Center Section - Search with Animation */}
      <div 
        className={`absolute left-0 right-0 mx-auto w-full max-w-xl px-4 z-0 transition-all duration-300 ease-out ${
          isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{
          transformOrigin: 'center center',
          transitionProperty: 'opacity, transform',
        }}
      >
        <div ref={searchContainerRef} className="mx-auto flex items-center w-full">
          <div className="relative w-full">
            {/* Glass effect background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-full -z-10 shadow-lg border border-white/20"></div>
            
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-primarycolor/5 to-transparent rounded-full -z-10"></div>
            
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-transparent rounded-full px-5 py-3 text-sm text-primarycolor placeholder-primarycolor/70 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 border border-white/10 hover:border-white/20"
              style={{
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(4px)'
              }}
              autoFocus
            />
          </div>
        </div>
      </div>
      
      {/* Right Section - Icons */}
      <div className="flex items-center gap-4 z-10">
        <button 
          onClick={toggleSearch} 
          className="p-2 text-gray-600 hover:text-primarycolor hover:bg-primarycolor/10 rounded-full transition-all duration-200 transform hover:scale-110"
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
        >
          {isSearchOpen ? (
            <IoClose className="text-2xl" />
          ) : (
            <IoSearch className="text-2xl" />
          )}
        </button>
        <button 
          className="p-2 rounded-full text-gray-600 hover:text-primarycolor hover:bg-primarycolor/10 transition-all duration-200 transform hover:scale-110" 
          aria-label="Online status"
        >
          <HiOutlineStatusOnline className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default CommunityHead