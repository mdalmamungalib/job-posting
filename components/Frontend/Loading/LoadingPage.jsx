// components/LoadingPage/index.jsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SkeletonCard from './SkeletonCard'
import LoadingBar from './LoadingBar'

/**
 * LoadingPage component for job posting site
 * Props:
 * - isLoading: boolean (default: true)
 * - message: string (optional loading message)
 * - progress: number (0-100, optional progress value)
 */
export default function LoadingPage({ 
  isLoading = true, 
  message, 
  progress 
}) {
  const shouldReduceMotion = useReducedMotion()
  
  if (!isLoading) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5
      }
    }
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-white dark:bg-primary-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      exit={{ opacity: 0 }}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {/* App branding/logo area */}
      <motion.div 
        className="flex flex-col items-center mb-8"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r from-primary-100 to-primary-200">
          <span className="text-xl font-bold text-white">JP</span>
        </div>
        <h1 className="text-2xl font-bold text-primary-200 dark:text-white">
          JobPost
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-300">
          Find your dream job
        </p>
      </motion.div>

      {/* Loading progress indicator */}
      {progress !== undefined && (
        <motion.div variants={itemVariants} className="w-full max-w-xs mb-8">
          <LoadingBar progress={progress} />
        </motion.div>
      )}

      {/* Custom message or default loading text */}
      <motion.div 
        variants={itemVariants}
        className="mb-8 text-center"
      >
        <p className="text-gray-600 dark:text-gray-200">
          {message ?? 'Loading job opportunities...'}
        </p>
      </motion.div>

      {/* Skeleton preview of content to come */}
      <motion.div 
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <SkeletonCard />
        <SkeletonCard className="mt-4 opacity-80" />
        <SkeletonCard className="mt-4 opacity-60" />
      </motion.div>
    </motion.div>
  )
}