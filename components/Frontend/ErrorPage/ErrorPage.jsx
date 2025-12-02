// components/ErrorPage/index.jsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ErrorIllustration from './ErrorIllustration'
import ErrorActions from './ErrorActions'

/**
 * ErrorPage component for job posting site
 * Props:
 * - error: Error object or string
 * - resetError: Function to try recovery
 * - statusCode: number (HTTP status code)
 * - title: string (custom error title)
 * - message: string (custom error message)
 */
export default function ErrorPage({ 
  error, 
  resetError, 
  statusCode, 
  title, 
  message 
}) {
  const shouldReduceMotion = useReducedMotion()
  
  // Extract error information defensively
  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message ?? 'Something went wrong'
  
  const errorCode = statusCode ?? error?.statusCode ?? 500
  
  const errorTitle = title ?? (
    errorCode === 404 
      ? 'Page Not Found' 
      : errorCode === 500 
        ? 'Server Error' 
        : 'Oops! Something went wrong'
  )
  
  const displayMessage = message ?? (
    errorCode === 404 
      ? "The job page you're looking for doesn't exist or may have been removed."
      : "We're having trouble loading this content. Please try again."
  )

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
      className="flex items-center justify-center min-h-screen p-4 bg-white dark:bg-primary-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-md text-center">
        {/* Error illustration */}
        <motion.div variants={itemVariants} className="mb-6">
          <ErrorIllustration errorCode={errorCode} />
        </motion.div>

        {/* Error code */}
        <motion.div variants={itemVariants}>
          <span 
            className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full text-error-600 dark:text-error-100 bg-error-100 dark:bg-error-600/20"
          >
            Error {errorCode}
          </span>
        </motion.div>

        {/* Error title */}
        <motion.h1 
          variants={itemVariants}
          className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
        >
          {errorTitle}
        </motion.h1>

        {/* Error message */}
        <motion.p 
          variants={itemVariants}
          className="mb-6 text-gray-600 dark:text-gray-200"
        >
          {displayMessage}
        </motion.p>

        {/* Technical details (collapsible for users) */}
        {process.env.NODE_ENV === 'development' && errorMessage && (
          <motion.details variants={itemVariants} className="mb-6 text-left">
            <summary className="mb-2 text-sm text-gray-500 cursor-pointer dark:text-gray-400">
              Technical Details
            </summary>
            <pre className="p-3 overflow-auto text-xs text-gray-600 bg-gray-100 rounded dark:text-gray-300 dark:bg-primary-200">
              {errorMessage}
            </pre>
          </motion.details>
        )}

        {/* Action buttons */}
        <motion.div variants={itemVariants}>
          <ErrorActions resetError={resetError} errorCode={errorCode} />
        </motion.div>
      </div>
    </motion.div>
  )
}