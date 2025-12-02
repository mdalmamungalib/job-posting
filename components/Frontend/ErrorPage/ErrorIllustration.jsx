// components/ErrorPage/ErrorIllustration.jsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

/**
 * Error illustration component with different visuals based on error type
 * Props:
 * - errorCode: number
 */
export default function ErrorIllustration({ errorCode }) {
  const shouldReduceMotion = useReducedMotion()
  
  const illustrationVariants = {
    hidden: { 
      scale: shouldReduceMotion ? 1 : 0.8,
      opacity: 0 
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut"
      }
    }
  }

  // Different illustrations based on error type
  const getIllustration = () => {
    switch(errorCode) {
      case 404:
        return (
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary-100/20 dark:bg-primary-100/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary-100/30 dark:bg-primary-100/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-200">
                <span className="text-2xl font-bold text-white">?</span>
              </div>
            </div>
          </div>
        )
      case 500:
        return (
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-error-100 dark:bg-error-600/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-error-500/30 dark:bg-error-600/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-error-500 dark:bg-error-600">
                <span className="text-2xl font-bold text-white">!</span>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary-100/20 dark:bg-primary-100/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary-200/30 dark:bg-primary-200/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-200 dark:bg-primary-100">
                <span className="text-2xl font-bold text-white">!</span>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      variants={illustrationVariants}
      aria-hidden="true"
    >
      {getIllustration()}
    </motion.div>
  )
}