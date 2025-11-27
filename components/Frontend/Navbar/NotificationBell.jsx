'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function NotificationBell({ count = 0, shouldReduceMotion }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
        whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px]"
        aria-label={`Notifications ${count > 0 ? `(${count} unread)` : ''}`}
      >
        <span className="text-xl">🔔</span>
        
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1"
            >
              {count > 9 ? '9+' : count}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.2,
              ease: 'easeOut'
            }}
            className="absolute right-0 z-50 py-2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-80 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Notifications
              </h3>
            </div>
            
            {count === 0 ? (
              <p className="px-4 py-8 text-sm text-center text-gray-500 dark:text-gray-400">
                No new notifications
              </p>
            ) : (
              <div className="overflow-y-auto max-h-60">
                {/* Notification items would go here */}
                <div className="px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New job matches your criteria
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}