// components/LoadingPage/LoadingBar.jsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animated progress bar
 * Props:
 * - progress: number (0-100)
 */
export default function LoadingBar({ progress = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-primary-100/30">
      <motion.div 
        className="h-2 rounded-full bg-gradient-to-r from-primary-100 to-primary-200"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: "easeOut"
        }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        role="progressbar"
      />
    </div>
  )
}