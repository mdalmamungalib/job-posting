// components/navigation/mobile-bottom-nav.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, PlusCircle, Bell, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNavSkeleton = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 safe-area-inset-bottom">
    <div className="flex items-center justify-around h-16 px-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
          <div className="w-12 h-3 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const NavItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  notificationCount 
}) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center relative p-2 rounded-xl transition-all duration-200 flex-1",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
      isActive 
        ? "text-blue-600 dark:text-blue-400" 
        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
    )}
    whileTap={{ scale: 0.9 }}
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <div className="relative">
      <Icon className={cn(
        "w-6 h-6 transition-colors duration-200",
        isActive && "text-blue-600 dark:text-blue-400"
      )} />
      
      {notificationCount && notificationCount > 0 && label === 'Notifications' && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium"
        >
          {Math.min(notificationCount, 9)}
        </motion.span>
      )}
    </div>
    
    <motion.span
      className={cn(
        "text-xs font-medium mt-1 transition-colors duration-200",
        isActive 
          ? "text-blue-600 dark:text-blue-400" 
          : "text-gray-500 dark:text-gray-400"
      )}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
    >
      {label}
    </motion.span>
    
    {/* Active Indicator */}
    {isActive && (
      <motion.div
        className="absolute top-0 w-12 h-0.5 bg-blue-500 rounded-full"
        layoutId="mobileActiveIndicator"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
  </motion.button>
);

export const MobileBottomNav = ({
  activeItem = 'home',
  onItemClick,
  notificationCount = 0,
  isLoading = false
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs' },
    { id: 'post', label: 'Post', icon: PlusCircle, href: '/post-job' },
    { id: 'notifications', label: 'Notifications', icon: Bell, href: '/notifications' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ];

  if (isLoading) {
    return <MobileBottomNavSkeleton />;
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 safe-area-inset-bottom"
      style={{ 
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div className="flex items-center justify-around h-16 max-w-md px-4 mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => {
              onItemClick?.(item.id);
              // In real app, you'd navigate to item.href
              console.log('Navigating to:', item.href);
            }}
            notificationCount={item.id === 'notifications' ? notificationCount : undefined}
          />
        ))}
      </div>
    </motion.div>
  );
};