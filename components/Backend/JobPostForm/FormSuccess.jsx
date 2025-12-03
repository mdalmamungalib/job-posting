// components/JobPostForm/FormSuccess.jsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * FormSuccess component for submission success message
 * Props:
 * - onClose: function
 */
export default function FormSuccess({ onClose }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 mb-6 bg-green-100 border border-green-300 rounded-lg dark:bg-green-900/30 dark:border-green-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-medium text-green-700 dark:text-green-300">
            Job posted successfully! It will be reviewed and published soon.
          </span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200"
          aria-label="Close success message"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}