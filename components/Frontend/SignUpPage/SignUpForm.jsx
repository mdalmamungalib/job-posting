"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
export const dynamic = "force-dynamic";

const SignUpForm = ({ onSubmit: onSubmitProp = () => {}, shouldReduceMotion = false }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        toast.error(result.message || "Signup failed");
        return;
      } else {
        toast.success("Account created successfully!");
        reset();
        router.push("/login");
      }
      
      // Call the parent component's onSubmit if provided
      onSubmitProp(result);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("SignUpForm submission error:", error);
    } finally {
      setLoading(false);
    }
  }

  const inputVariants = {
    focus: {
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: { duration: shouldReduceMotion ? 0 : 0.2 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}>
      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name *
          </label>
          <motion.input
            variants={inputVariants}
            whileFocus="focus"
            type="text"
            {...register("firstName", {
              required: "First name is required",
            })}
            className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="John"
            aria-describedby={errors?.firstName ? "firstName-error" : undefined}
            aria-invalid={!!errors?.firstName}
          />
          {errors?.firstName && (
            <p
              id="firstName-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name *
          </label>
          <motion.input
            variants={inputVariants}
            whileFocus="focus"
            type="text"
            {...register("lastName", {
              required: "Last name is required",
            })}
            className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Doe"
            aria-describedby={errors?.lastName ? "lastName-error" : undefined}
            aria-invalid={!!errors?.lastName}
          />
          {errors?.lastName && (
            <p
              id="lastName-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address *
        </label>
        <motion.input
          variants={inputVariants}
          whileFocus="focus"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="john@example.com"
          aria-describedby={errors?.email ? "email-error" : undefined}
          aria-invalid={!!errors?.email}
        />
        {errors?.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Password *
        </label>
        <motion.input
          variants={inputVariants}
          whileFocus="focus"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="••••••••"
          aria-describedby={errors?.password ? "password-error" : undefined}
          aria-invalid={!!errors?.password}
        />
        {errors?.password && (
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password *
        </label>
        <motion.input
          variants={inputVariants}
          whileFocus="focus"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="••••••••"
          aria-describedby={
            errors?.confirmPassword ? "confirmPassword-error" : undefined
          }
          aria-invalid={!!errors?.confirmPassword}
        />
        {errors?.confirmPassword && (
          <p
            id="confirmPassword-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <motion.input
          type="checkbox"
          {...register("agreeToTerms", {
            required: "You must agree to the terms",
          })}
          className="w-4 h-4 mt-1 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          aria-describedby={errors?.agreeToTerms ? "terms-error" : undefined}
          aria-invalid={!!errors?.agreeToTerms}
        />
        <label
          htmlFor="agreeToTerms"
          className="text-sm text-gray-700 dark:text-gray-300">
          I agree to the{" "}
          <button
            type="button"
            className="rounded text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500">
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="rounded text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500">
            Privacy Policy
          </button>
        </label>
      </div>
      {errors?.agreeToTerms && (
        <p id="terms-error" className="text-sm text-red-600 dark:text-red-400">
          {errors.agreeToTerms.message}
        </p>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className="w-full px-5 py-3 font-medium text-center text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 focus:outline-none bg-[#41529c] cursor-pointer">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </motion.button>
    </motion.form>
  );
};

export default SignUpForm;