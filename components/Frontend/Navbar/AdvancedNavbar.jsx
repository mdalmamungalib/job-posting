// components/navigation/AdvancedNavbar.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons (using Lucide icons - replace with your preferred icon library)
import {
  Home,
  Search,
  Briefcase,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Building,
  DollarSign,
  Clock
} from 'lucide-react';

// Custom hooks for responsive behavior and animations
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return reducedMotion;
};

// Skeleton Loaders
const NavbarSkeleton = () => (
  <div className="w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
          <div className="hidden md:block">
            <div className="w-32 h-4 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
          </div>
        </div>
        <div className="items-center hidden space-x-8 lg:flex">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-16 h-4 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600 animate-pulse" />
          <div className="hidden w-8 h-8 bg-gray-300 rounded-lg sm:block dark:bg-gray-600 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const BottomNavSkeleton = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 safe-area-inset-bottom">
    <div className="flex items-center justify-around h-16">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
          <div className="w-8 h-2 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

// Main Navigation Component
const AdvancedNavbar = ({ 
  companyData = {},
  jobData = {},
  userData = {}
}) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Navigation items with fallbacks
  const navItems = [
    {
      id: 'home',
      label: companyData?.name ?? 'Career Portal',
      href: '/',
      icon: Home,
      mobileLabel: 'Home'
    },
    {
      id: 'jobs',
      label: 'Jobs',
      href: '/jobs',
      icon: Briefcase,
      mobileLabel: 'Jobs',
      badge: jobData?.totalCount ?? 0
    },
    {
      id: 'search',
      label: 'Search',
      href: '/search',
      icon: Search,
      mobileLabel: 'Search'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      href: '/alerts',
      icon: Bell,
      mobileLabel: 'Alerts',
      badge: userData?.notificationCount ?? 0
    },
    {
      id: 'profile',
      label: 'Profile',
      href: '/profile',
      icon: User,
      mobileLabel: 'Profile'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.3,
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.2,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: reducedMotion ? 0 : 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.2
      }
    }
  };

  const tapFeedbackVariants = {
    tap: {
      scale: reducedMotion ? 1 : 0.95,
      transition: {
        duration: reducedMotion ? 0 : 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <NavbarSkeleton />
        {isMobile && <BottomNavSkeleton />}
      </>
    );
  }

  // Desktop Navigation
  const DesktopNav = () => (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="items-center hidden space-x-8 md:flex"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const IconComponent = item.icon;
        
        return (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileTap="tap"
            variants={tapFeedbackVariants}
          >
            <Link
              href={item.href}
              className={`
                relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <IconComponent className="w-4 h-4" />
              <span>{item.label}</span>
              
              {item.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1"
                >
                  {item.badge}
                </motion.span>
              )}
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-blue-100 rounded-lg dark:bg-blue-900/30 -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={item.id}
              className="flex justify-center flex-1"
              whileTap="tap"
              variants={tapFeedbackVariants}
            >
              <button
                onClick={() => setActiveNav(item.id)}
                className={`
                  relative flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                <div className="relative">
                  <IconComponent className="w-5 h-5" />
                  
                  {item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1"
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.span>
                  )}
                </div>
                
                <motion.span
                  className={`
                    text-xs mt-1 font-medium transition-all duration-200
                    ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}
                  `}
                >
                  {item.mobileLabel}
                </motion.span>
                
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute top-0 h-1 bg-blue-500 rounded-full inset-x-2"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );

  // Mobile Menu (Drawer)
  const MobileMenu = () => (
  <AnimatePresence>
    {isMobileMenuOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed top-0 bottom-0 right-0 z-50 bg-white border-l border-gray-200 shadow-xl w-80 dark:bg-gray-900 dark:border-gray-700 md:hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Menu
              </h2>

              <motion.button
                whileTap="tap"
                variants={tapFeedbackVariants}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Items */}
          <div className="p-6 space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileTap="tap"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 p-3 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>

                    {item.badge > 0 && (
                      <span className="px-2 py-1 ml-auto text-xs text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);


  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.4 }}
        className="sticky top-0 z-30 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                  className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
                >
                  <Briefcase className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text">
                  {companyData?.name ?? 'Career Portal'}
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Right Side Actions */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-4"
            >
              {/* Search Button (Mobile) */}
              <motion.button
                variants={itemVariants}
                whileTap="tap"
                variants={tapFeedbackVariants}
                className="p-2 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                variants={itemVariants}
                whileTap="tap"
                variants={tapFeedbackVariants}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {userData?.notificationCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1"
                  >
                    {userData.notificationCount > 9 ? '9+' : userData.notificationCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User Profile */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3"
              >
                <motion.div
                  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                  className="relative"
                >
                  <Image
                    src={userData?.avatar ?? '/default-avatar.png'}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="border-2 border-gray-200 rounded-full dark:border-gray-600"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="flex items-center justify-center hidden w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                variants={itemVariants}
                whileTap="tap"
                variants={tapFeedbackVariants}
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNav />}

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
};

export default AdvancedNavbar;