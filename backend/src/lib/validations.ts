import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),
})

export const quoteSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  product: z.string().min(1, "Please select a product category"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export const updateQuoteSchema = z.object({
  status: z.enum(["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED"]).optional(),
  adminNotes: z.string().optional(),
  quotedPrice: z.string().optional(),
})

export const createOrderSchema = z.object({
  quoteId: z.string().optional(),
  userId: z.string().min(1, "Buyer is required"),
  product: z.string().min(1, "Product is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
  unitPrice: z.number().positive().optional(),
  notes: z.string().optional(),
  estimatedDelivery: z.string().optional(),
})

export const updateOrderSchema = z.object({
  status: z.enum([
    "CONFIRMED",
    "IN_PRODUCTION",
    "QUALITY_CHECK",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]).optional(),
  note: z.string().optional(),
  trackingNumber: z.string().optional(),
  estimatedDelivery: z.string().optional(),
})
