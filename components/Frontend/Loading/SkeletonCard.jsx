// components/LoadingPage/SkeletonCard.jsx
'use client'

import { motion } from 'framer-motion'

/**
 * Skeleton loading card for job preview
 * Props:
 * - className: string (additional classes)
 */
export default function SkeletonCard({ className = '' }) {
  return (
    <div 
      className={`bg-white dark:bg-primary-200 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-primary-100 overflow-hidden relative ${className}`}
      style={{ minHeight: '100px' }}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 dark:via-primary-100/20 to-transparent animate-shimmer" />
      
      <div className="flex items-start space-x-3">
        {/* Company logo placeholder */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg dark:bg-primary-100" />
        
        <div className="flex-1 space-y-2">
          {/* Job title placeholder */}
          <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-primary-100" />
          
          {/* Company name placeholder */}
          <div className="w-1/2 h-3 bg-gray-200 rounded dark:bg-primary-100" />
          
          {/* Tags placeholder */}
          <div className="flex pt-2 space-x-2">
            <div className="w-16 h-6 bg-gray-200 rounded-full dark:bg-primary-100" />
            <div className="w-20 h-6 bg-gray-200 rounded-full dark:bg-primary-100" />
          </div>
        </div>
      </div>
    </div>
  )
}