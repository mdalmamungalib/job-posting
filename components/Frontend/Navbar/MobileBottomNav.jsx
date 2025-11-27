'use client'

import { motion } from 'framer-motion'
import NavItem from './NavItem'
import UserMenu from './UserMenu'
import SearchBar from './SearchBar'
import NotificationBell from './NotificationBell'

export default function MobileBottomNav({
  user,
  notifications,
  onSearch,
  onLogin,
  onLogout,
  currentPath,
  shouldReduceMotion
}) {
  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/jobs', label: 'Jobs', icon: '💼' },
    { href: '/search', label: 'Search', icon: '🔍' },
    { href: '/notifications', label: 'Alerts', icon: '🔔' },
    { href: '/profile', label: 'Profile', icon: '👤' }
  ]

  return (
    <motion.nav
      initial={false}
      className="border-t shadow-lg bg-card border-border"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : index * 0.1,
              duration: shouldReduceMotion ? 0 : 0.3
            }}
            className="flex-1"
          >
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={currentPath === item.href}
              isMobile={true}
              shouldReduceMotion={shouldReduceMotion}
            />
          </motion.div>
        ))}
      </div>

      {/* Search Overlay (could be expanded) */}
      <div className="absolute left-0 right-0 p-4 border-b bg-card border-border bottom-full">
        <SearchBar onSearch={onSearch} isMobile={true} />
      </div>
    </motion.nav>
  )
}