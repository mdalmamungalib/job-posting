// components/JobPostForm/FormSkeleton.jsx
'use client'

import { motion } from 'framer-motion'

/**
 * Skeleton loader for the job post form
 */
export default function FormSkeleton() {
  return (
    <div className="max-w-4xl p-4 mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="w-1/4 h-8 mb-6 bg-gray-200 rounded dark:bg-primary-200"></div>
      
      {/* Section Skeletons */}
      {[1, 2, 3, 4].map((section) => (
        <motion.div 
          key={section}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: section * 0.1 }}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-primary-300 dark:border-primary-200"
        >
          <div className="w-1/3 h-6 mb-4 bg-gray-200 rounded dark:bg-primary-200"></div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2].map((field) => (
              <div key={field} className="space-y-2">
                <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-primary-200"></div>
                <div className="h-10 bg-gray-200 rounded dark:bg-primary-200"></div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Action Buttons Skeleton */}
      <div className="flex justify-end pt-4 space-x-4">
        <div className="w-24 h-10 bg-gray-200 rounded dark:bg-primary-200"></div>
        <div className="w-32 h-10 bg-gray-200 rounded dark:bg-primary-200"></div>
      </div>
    </div>
  )
}