'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function FormField({ 
  label, 
  name, 
  type = 'text',
  register,
  errors,
  required,
  placeholder,
  options = [],
  rows = 3,
  maxLength,
  pattern,
  watch
}) {
  const shouldReduceMotion = useReducedMotion()
  const error = errors?.[name]

  const fieldVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.3 }
    }
  }

  // 🎨 Color palette applied
  const inputBaseClasses =
  "w-full px-3 py-2 rounded-lg border border-uro-600/40 " +
  "focus:outline-none focus:ring-2 focus:ring-uro-700 focus:border-uro-700 " +
  "bg-white text-gray-900 placeholder-gray-500 " +               // LIGHT MODE OK
  "dark:bg-uro-800 dark:text-uro-50 dark:placeholder-gray-300"; // DARK MODE OK


  const inputErrorClasses =
    "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-600"

  return (
    <motion.div className="space-y-1" variants={fieldVariants}>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          {...register(name, { 
            required: required || false,
            maxLength: maxLength ? { value: maxLength, message: `Maximum ${maxLength} characters` } : undefined,
            pattern: pattern
          })}
          placeholder={placeholder}
          rows={rows}
          className={`${inputBaseClasses} ${error ? inputErrorClasses : ''} resize-vertical min-h-[80px]`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          {...register(name, { required: required || false })}
          className={`${inputBaseClasses} ${error ? inputErrorClasses : ''} cursor-pointer`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, { 
            required: required || false,
            maxLength: maxLength ? { value: maxLength, message: `Maximum ${maxLength} characters` } : undefined,
            pattern: pattern
          })}
          placeholder={placeholder}
          className={`${inputBaseClasses} ${error ? inputErrorClasses : ''}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          id={`${name}-error`}
          role="alert"
        >
          {error.message}
        </motion.p>
      )}

      {maxLength && (
        <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
          {watch?.(name)?.length || 0}/{maxLength} characters
        </p>
      )}
    </motion.div>
  )
}
