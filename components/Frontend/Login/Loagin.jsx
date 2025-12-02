"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import SkeletonSignUp from "../SignUpPage/SkeletonSignUp";
import LoginForm from "./LoginForm";
import SocialSignIn from "../SignUpPage/SocialSignIn";
import Link from "next/link";
/**
 * SignUpPage Component Props:
 * - isLoading?: boolean
 * - error?: string | null
 * - onSubmit?: (data) => void
 * - onSocialSignIn?: (provider) => void
 */
const Login = ({
  isLoading = false,
  error = null,
  onSubmit = () => {},
  onSocialSignIn = () => {},
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (isLoading) {
    return <SkeletonSignUp />;
  }

  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md">
        <div className="p-6 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl sm:p-8 dark:border-gray-700">
          {/* Header */}
          <motion.div
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              scale: shouldReduceMotion ? 1 : 0.9,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.2,
              duration: shouldReduceMotion ? 0 : 0.4,
            }}
            className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Join Our Job Platform
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Login to start applying for jobs
            </p>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 mb-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}

          {/* Social Sign In */}
          <SocialSignIn
            onSocialSignIn={onSocialSignIn}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
                Or continue with email or password
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <LoginForm
            onSubmit={onSubmit}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.8 }}
          className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/signup">
              <button className="font-medium rounded cursor-pointer text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-primary-500">
                Sign Up
              </button>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
