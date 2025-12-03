// components/JobPostForm/FormActions.jsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * FormActions component for submit/cancel buttons
 * Props:
 * - onCancel: function
 * - isLoading: boolean
 * - isValid: boolean
 * - isEditing: boolean
 */
export default function FormActions({
  onCancel,
  isLoading,
  isValid,
  isEditing = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  const buttonVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.3 },
    },
    tap: { scale: shouldReduceMotion ? 1 : 0.98 },
  };

  return (
    <motion.div
      className="flex flex-col justify-end gap-4 pt-6 border-t border-gray-200 sm:flex-row dark:border-primary-200"
      variants={buttonVariants}>
      <motion.button
        type="button"
        onClick={onCancel}
        whileTap="tap"
        className="px-6 py-3 border border-gray-300 dark:border-primary-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-200/10 rounded-lg font-medium transition-colors min-h-[44px]"
        disabled={isLoading}>
        Cancel
      </motion.button>

      <motion.button
        type="submit"
        whileTap="tap"
        className={`px-6 py-3 rounded-lg font-medium min-h-[44px] transition-colors ${
          isLoading || !isValid
            ? "bg-[#41529c] dark:bg-primary-200/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : "bg-[#41529c] hover:bg-primary-200 dark:bg-primary-200 dark:hover:bg-primary-100 text-white cursor-pointer"
        }`}
        disabled={isLoading || !isValid}
        aria-live="polite">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            <span>Posting Job...</span>
          </div>
        ) : isEditing ? (
          "Update Job"
        ) : (
          "Post Job"
        )}
      </motion.button>
    </motion.div>
  );
}
