// components/ErrorPage/ErrorActions.jsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Error action buttons component
 * Props:
 * - resetError: Function to try recovery
 * - errorCode: number
 */
export default function ErrorActions({ resetError, errorCode }) {
  const shouldReduceMotion = useReducedMotion()
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3
      }
    },
    tap: { scale: shouldReduceMotion ? 1 : 0.98 }
  }

  const handleRetry = () => {
    if (resetError) {
      resetError()
    } else {
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleGoToJobs = () => {
    window.location.href = '/jobs'
  }

  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row">
      {/* Retry button for recoverable errors */}
      {errorCode !== 404 && (
        <motion.button
          variants={buttonVariants}
          whileTap="tap"
          onClick={handleRetry}
          className="px-6 py-3 bg-primary-100 hover:bg-primary-200 dark:bg-primary-200 dark:hover:bg-primary-100 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 transition-colors min-h-[44px] flex items-center justify-center"
          aria-label="Try again"
        >
          Try Again
        </motion.button>
      )}
      
      {/* Go to Jobs for 404 errors, Home for others */}
      <motion.button
        variants={buttonVariants}
        whileTap="tap"
        onClick={errorCode === 404 ? handleGoToJobs : handleGoHome}
        className="px-6 py-3 border border-primary-100 text-primary-100 dark:text-primary-200 dark:border-primary-200 hover:bg-primary-50 dark:hover:bg-primary-200/10 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 transition-colors min-h-[44px] flex items-center justify-center"
        aria-label={errorCode === 404 ? "Browse all jobs" : "Go to homepage"}
      >
        {errorCode === 404 ? "Browse Jobs" : "Go Home"}
      </motion.button>
    </div>
  )
}