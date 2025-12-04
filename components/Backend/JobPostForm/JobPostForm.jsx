// components/JobPostForm/index.jsx
'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import FormSkeleton from './FormSkeleton'
import FormField from './FormField'
import FormActions from './FormActions'
import FormSuccess from './FormSuccess'

/**
 * JobPostForm component for creating/editing job postings
 * Props:
 * - initialData: object (prefilled data for editing)
 * - onSuccess: function (callback after successful submission)
 * - onCancel: function (callback when form is cancelled)
 * - isLoading: boolean (external loading state)
 * - error: string (external error message)
 */
export default function JobPostForm({ 
  initialData, 
  onSuccess, 
  onCancel,
  isLoading: externalLoading,
  error: externalError
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  
  const isLoading = externalLoading ?? isSubmitting
  const error = externalError ?? submitError
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
    watch, 
    reset,
    control
  } = useForm({
    mode: 'onChange',
    defaultValues: initialData ?? {
      jobTitle: '',
      companyName: '',
      companyLogo: '',
      location: '',
      jobType: 'full-time',
      salaryRange: '',
      description: '',
      requirements: '',
      benefits: '',
      applicationEmail: '',
      applicationUrl: '',
      category: 'engineering',
      experienceLevel: 'mid-level',
      remotePolicy: 'on-site'
    }
  })

  const jobType = watch('jobType')
  const remotePolicy = watch('remotePolicy')

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true)
  //   setSubmitError(null)
    
  //   try {
  //     // Simulate API call
  //     const response = await axios.post('/api/jobs', data, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
      
  //     setIsSuccess(true)
  //     reset()
  //     onSuccess?.(response.data)
      
  //     // Auto-hide success message after 3 seconds
  //     setTimeout(() => setIsSuccess(false), 3000)
  //   } catch (err) {
  //     setSubmitError(err.response?.data?.message ?? 'Failed to create job posting')
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  const onSubmit = async (data) => {
    try {
      
    } catch (error) {
      
    }
  }
  
  const onCancelClick = () => {
    reset()
    onCancel?.()
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    }
  }

  if (isLoading && !initialData) {
    return <FormSkeleton />
  }

  return (
    <motion.div 
      className="max-w-4xl p-4 mx-auto"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      {/* Success Message */}
      {isSuccess && (
        <FormSuccess onClose={() => setIsSuccess(false)} />
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 mb-6 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900/30 dark:border-red-700"
        >
          <div className="flex items-center">
            <span className="font-medium text-red-700 dark:text-red-300">
              {error}
            </span>
          </div>
        </motion.div>
      )}

      <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        variants={formVariants}
      >
        {/* Basic Information Section */}
        <motion.section 
          className="p-6 bg-gray-900 border border-gray-200 rounded-lg shadow-sm dark:bg-primary-300 dark:border-primary-200"
          variants={formVariants}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              label="Job Title *"
              name="jobTitle"
              type="text"
              register={register}
              errors={errors}
              placeholder="e.g., Senior Frontend Developer"
              required="Job title is required"
              maxLength={100}
              watch={watch}
            />
            
            <FormField
              label="Company Name *"
              name="companyName"
              type="text"
              register={register}
              errors={errors}
              placeholder="e.g., TechCorp Inc."
              required="Company name is required"
              watch={watch} 
            />
          </div>
          
          <FormField
            label="Job Description *"
            name="description"
            type="textarea"
            register={register}
            errors={errors}
            placeholder="Describe the role, responsibilities, and what makes your company great..."
            required="Job description is required"
            rows={4}
            watch={watch}
          />
        </motion.section>

        {/* Details Section */}
        <motion.section 
          className="p-6 bg-gray-900 border border-gray-200 rounded-lg shadow-sm dark:bg-primary-300 dark:border-primary-200"
          variants={formVariants}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Job Details
          </h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              label="Location *"
              name="location"
              type="text"
              register={register}
              errors={errors}
              placeholder="e.g., San Francisco, CA"
              required="Location is required"
              watch={watch}
            />
            
            <FormField
              label="Job Type *"
              name="jobType"
              type="select"
              register={register}
              errors={errors}
              required="Job type is required"
              options={[
                { value: 'full-time', label: 'Full Time' },
                { value: 'part-time', label: 'Part Time' },
                { value: 'contract', label: 'Contract' },
                { value: 'internship', label: 'Internship' },
                { value: 'freelance', label: 'Freelance' }
              ]}
              watch={watch}
            />
            
            <FormField
              label="Experience Level *"
              name="experienceLevel"
              type="select"
              register={register}
              errors={errors}
              required="Experience level is required"
              options={[
                { value: 'intern', label: 'Intern' },
                { value: 'entry-level', label: 'Entry Level' },
                { value: 'mid-level', label: 'Mid Level' },
                { value: 'senior', label: 'Senior' },
                { value: 'lead', label: 'Lead' },
                { value: 'executive', label: 'Executive' }
              ]}
              watch={watch}
            />
            
            <FormField
              label="Remote Policy"
              name="remotePolicy"
              type="select"
              register={register}
              errors={errors}
              options={[
                { value: 'on-site', label: 'On Site' },
                { value: 'remote', label: 'Remote' },
                { value: 'hybrid', label: 'Hybrid' }
              ]}
              watch={watch} 
            />
            
            <FormField
              label="Salary Range"
              name="salaryRange"
              type="text"
              register={register}
              errors={errors}
              placeholder="e.g., $80,000 - $120,000"
              watch={watch} 
            />
            
            <FormField
              label="Category"
              name="category"
              type="select"
              register={register}
              errors={errors}
              options={[
                { value: 'engineering', label: 'Engineering' },
                { value: 'design', label: 'Design' },
                { value: 'product', label: 'Product' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'sales', label: 'Sales' },
                { value: 'operations', label: 'Operations' }
              ]}
              watch={watch} 
            />
          </div>
        </motion.section>

        {/* Requirements & Benefits */}
        <motion.section 
          className="p-6 bg-gray-900 border border-gray-200 rounded-lg shadow-sm dark:bg-primary-300 dark:border-primary-200"
          variants={formVariants}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Requirements & Benefits
          </h2>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormField
              label="Requirements *"
              name="requirements"
              type="textarea"
              register={register}
              errors={errors}
              placeholder="List the required skills, qualifications, and experience..."
              required="Requirements are required"
              rows={5}
              watch={watch} 
            />
            
            <FormField
              label="Benefits"
              name="benefits"
              type="textarea"
              register={register}
              errors={errors}
              placeholder="List the benefits and perks you offer..."
              rows={5}
              watch={watch} 
            />
          </div>
        </motion.section>

        {/* Application Details */}
        <motion.section 
          className="p-6 bg-gray-900 border border-gray-200 rounded-lg shadow-sm dark:bg-primary-300 dark:border-primary-200"
          variants={formVariants}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Application Details
          </h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              label="Application Email"
              name="applicationEmail"
              type="email"
              register={register}
              errors={errors}
              placeholder="careers@company.com"
              pattern={{
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
              }}
              watch={watch} 
            />
            
            <FormField
              label="Application URL"
              name="applicationUrl"
              type="url"
              register={register}
              errors={errors}
              placeholder="https://company.com/careers/apply"
              pattern={{
                value: /https?:\/\/.+\..+/,
                message: "Please enter a valid URL"
              }}
              watch={watch} 
            />
          </div>
        </motion.section>

        {/* Form Actions */}
        <FormActions 
          onCancel={onCancelClick}
          isLoading={isLoading}
          isValid={isValid}
          isEditing={!!initialData}
          
        />
      </motion.form>
    </motion.div>
  )
}