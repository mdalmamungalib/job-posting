'use client'

import { motion } from 'framer-motion'
import NavItem from './NavItem'
import UserMenu from './UserMenu'
import SearchBar from './SearchBar'
import NotificationBell from './NotificationBell'

export default function DesktopNav({
  user,
  notifications,
  onSearch,
  onLogin,
  onLogout,
  currentPath,
  isScrolled,
  shouldReduceMotion
}) {
  const navItems = [
    { href: '/jobs', label: 'Jobs', icon: '💼' },
    { href: '/companies', label: 'Companies', icon: '🏢' },
    { href: '/salaries', label: 'Salaries', icon: '💰' }
  ]

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled 
          ? 'rgba(192, 39, 39, 0.95)' 
          : '#830404',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          : 'none'
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: 'easeOut'
      }}
      className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            className="flex-shrink-0"
          >
            <a
              href="/"
              className="text-2xl font-bold text-gray-900 transition-colors dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              JobPost
            </a>
          </motion.div>

          {/* Navigation Items */}
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={currentPath?.startsWith(item.href)}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <SearchBar onSearch={onSearch} />

            {/* Notifications */}
            <NotificationBell count={notifications} />

            {/* User Menu */}
            <UserMenu
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}