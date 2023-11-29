import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'The name can contain only letters'
    })
    .min(1, {
      message: 'Name is required'
    })
    .toLowerCase()
    .trim(),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(4, {
      message: 'Password must be between 4 and 12 characters'
    })
    .max(12, {
      message: 'Password must be between 4 and 12 characters'
    })
})

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Username is required'
    })
    .email({
      message: 'Invalid email'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(4, {
      message: 'Password must at least 4 characters'
    })
    .max(12, {
      message: 'Password must be between 4 and 12 characters'
    })
})

export const updateNameSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'The name can contain only letters'
    })
    .min(1, {
      message: 'Name is required'
    })
    .max(30)
    .toLowerCase()
    .trim()
})
export const updateEmailSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email'
    })
})
export const updatePasswordSchema = z.object({
  newPassword: z
    .string({
      required_error: 'Password is required'
    })
    .min(4, {
      message: 'Password must at least 4 characters'
    })
    .max(12, {
      message: 'Password must be between 4 and 12 characters'
    })
})
