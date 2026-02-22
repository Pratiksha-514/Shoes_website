import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../../environment';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const isHome = location.pathname === '/';

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth & User Details Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user details from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        setUserDetails(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("uid");
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/product' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dynamic Styles
  const headerBgClass = (isHome && !scrolled)
    ? 'bg-transparent py-6'
    : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-4 dark:border-b dark:border-gray-800';

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    if (isHome && !scrolled) {
      return isActive ? 'text-pink-400 font-bold' : 'text-white/90 hover:text-white font-medium';
    }
    return isActive ? 'text-pink-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium';
  };

  const iconClass = (isHome && !scrolled) ? 'text-white hover:text-pink-200' : 'text-gray-700 dark:text-gray-300 hover:text-pink-600';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <Link to="/" className="flex items-center group relative z-50">
            <div className="bg-gradient-to-tr from-pink-600 to-purple-600 p-2 rounded-lg mr-2 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <span className={`text-2xl font-black tracking-tighter ${(isHome && !scrolled && !mobileMenuOpen) ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400'} group-hover:opacity-90 transition-opacity`}>
              MY<span className={`${(isHome && !scrolled && !mobileMenuOpen) ? 'text-pink-400' : 'text-pink-600'}`}>SHOP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base relative group ${linkClass(link.path)}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${iconClass} hover:bg-gray-100 dark:hover:bg-gray-800`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>

            <Link to="/cart" className={`transition relative ${iconClass} group`}>
              <div className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {/* Cart Badge Demo */}
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 ${(isHome && !scrolled) ? 'text-white hover:bg-white/10' : 'text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-pink-500/40"
                  >
                    Register
                  </Link>
                </>
              ) : (
                // Profile Dropdown
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`flex items-center space-x-2 focus:outline-none transition-transform duration-200 ${showDropdown ? 'scale-105' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 shadow-md">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-pink-600 font-bold text-lg">
                        {userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all duration-300 origin-top-right z-50 animate-fade-in-down">
                      {/* User Info Header */}
                      <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{userDetails?.name || "User"}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link to="/profile" className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 transition-colors group">
                          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span className="font-medium">My Profile</span>
                        </Link>

                        <Link to="/orders" className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 transition-colors group">
                          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                          </svg>
                          <span className="font-medium">My Orders</span>
                        </Link>
                      </div>

                      {/* Check if is Admin */}
                      {userDetails?.email === 'admin@gmail.com' && (
                        <div className="border-t border-gray-100 dark:border-gray-800 mt-2">
                          <Link to="/admin" className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 transition-colors group">
                            <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span className="font-medium">Admin Dashboard</span>
                          </Link>
                        </div>
                      )}

                      {/* Logout */}
                      <div className="border-t border-gray-100 dark:border-gray-800 mt-2 p-2">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-xl transition-colors group"
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                          </svg>
                          <span className="font-bold">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-4 z-50">
            {/* Theme Toggle Button Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${(isHome && !scrolled && !mobileMenuOpen) ? 'text-white' : 'text-gray-900 dark:text-gray-200'}`}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              )}
            </button>

            <Link to="/cart" className={`relative ${iconClass}`}>
              <div className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${(isHome && !scrolled && !mobileMenuOpen) ? 'text-white hover:bg-white/10' : 'text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-950 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6 pb-6 overflow-y-auto">
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-black text-gray-900 dark:text-white hover:text-pink-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8">
            {!user ? (
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-xl font-bold bg-black dark:bg-pink-600 text-white text-center"
                >
                  Sign Up Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{userDetails?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>

                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg font-medium text-gray-600 dark:text-gray-300">My Profile</Link>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg font-medium text-gray-600 dark:text-gray-300">My Orders</Link>
                {userDetails?.email === 'admin@gmail.com' && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-lg font-bold text-pink-600">Admin Dashboard</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left py-3 text-lg font-bold text-red-500">Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

