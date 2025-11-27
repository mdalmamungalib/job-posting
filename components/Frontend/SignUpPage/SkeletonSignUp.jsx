'use client';

import { motion } from 'framer-motion';

const SkeletonSignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl sm:p-8 dark:border-gray-700">
          {/* Header Skeleton */}
          <div className="mb-8 text-center">
            <div className="relative w-3/4 h-8 mx-auto mb-2 overflow-hidden bg-gray-300 rounded-lg dark:bg-gray-600">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div className="relative w-1/2 h-4 mx-auto overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          {/* Social Buttons Skeleton */}
          <div className="mb-6 space-y-3">
            {[1, 2].map((item) => (
              <div 
                key={item}
                className="relative h-12 overflow-hidden bg-gray-200 rounded-lg dark:bg-gray-700"
              >
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            ))}
          </div>

          {/* Divider Skeleton */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center">
              <div className="px-2 bg-white dark:bg-gray-800">
                <div className="relative w-24 h-4 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2].map((item) => (
                <div key={item}>
                  <div className="relative w-16 h-4 mb-1 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                  <div className="relative h-10 overflow-hidden bg-gray-200 rounded-lg dark:bg-gray-700">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              ))}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative w-20 h-4 mb-1 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="relative h-10 overflow-hidden bg-gray-200 rounded-lg dark:bg-gray-700">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>

            {/* Password Fields */}
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="relative w-24 h-4 mb-1 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="relative h-10 overflow-hidden bg-gray-200 rounded-lg dark:bg-gray-700">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
            ))}

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <div className="relative w-4 h-4 mt-1 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="relative w-48 h-4 overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative h-12 overflow-hidden bg-gray-300 rounded-lg dark:bg-gray-600">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-6 text-center">
          <div className="relative w-48 h-4 mx-auto overflow-hidden bg-gray-200 rounded dark:bg-gray-700">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSignUp;