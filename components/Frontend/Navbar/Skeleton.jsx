'use client'

export default function Skeleton() {
  return (
    <>
      {/* Desktop Skeleton */}
      <div className="sticky top-0 z-50 hidden bg-white border-b border-gray-200 md:block dark:bg-gray-800 dark:border-gray-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Skeleton */}
            <div className="w-24 h-8 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
            
            {/* Navigation Items Skeleton */}
            <div className="items-center hidden space-x-8 md:flex">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-6 bg-gray-300 rounded dark:bg-gray-600 animate-pulse"
                />
              ))}
            </div>

            {/* Right Side Skeleton */}
            <div className="flex items-center space-x-4">
              {/* Search Skeleton */}
              <div className="w-64 h-10 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
              
              {/* Notification Skeleton */}
              <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600 animate-pulse" />
              
              {/* User Menu Skeleton */}
              <div className="w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-around h-16 px-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-1"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600 animate-pulse" />
              <div className="w-12 h-3 bg-gray-300 rounded dark:bg-gray-600 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}