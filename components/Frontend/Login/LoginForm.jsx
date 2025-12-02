"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
export const dynamic = "force-dynamic";

const LoginForm = ({
  onSubmit: onSubmitProp = () => {},
  shouldReduceMotion = false,
}) => {
  const [loading, setLoading] = useState(false);
  const {data: session, status} = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");


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
  
   useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

   async function onSubmit(data) {
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (loginData?.error) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.success("Login Successful!");
        reset();
        router.push(callbackUrl);
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
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

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className="w-full px-5 py-3 font-medium text-center text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 focus:outline-none bg-[#41529c] cursor-pointer">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Login User...
          </div>
        ) : (
          "Login"
        )}
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;
