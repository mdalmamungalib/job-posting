'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import DesktopNav from './DesktopNav'
import MobileBottomNav from './MobileBottomNav'
import Skeleton from './Skeleton'

/**
 * Props:
 * - user: { name: string, avatar: string, isLoggedIn: boolean }
 * - notifications: number
 * - isLoading: boolean
 * - onSearch: (query: string) => void
 * - onLogin: () => void
 * - onLogout: () => void
 * - currentPath: string
 */
export default function ResponsiveNavbar({
  user = {},
  notifications = 0,
  isLoading = false,
  onSearch = () => {},
  onLogin = () => {},
  onLogout = () => {},
  currentPath = '/'
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  const navProps = {
    user,
    notifications,
    onSearch,
    onLogin,
    onLogout,
    currentPath,
    isScrolled,
    shouldReduceMotion
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <DesktopNav {...navProps} />
      </div>

      {/* Mobile Bottom Navigation */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{
              type: shouldReduceMotion ? 'tween' : 'spring',
              stiffness: 300,
              damping: 30
            }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <MobileBottomNav {...navProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}