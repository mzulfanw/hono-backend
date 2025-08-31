import { z } from "@hono/zod-openapi";

export const AuthRequestSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const AuthRegistRequestSchema = z.object({
  name: z.string("Name required").min(5, "Name must be at least 5 characters"),
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const AuthRegistResponseSchema = z.object({
  name: z.string(),
  email: z.string()
})