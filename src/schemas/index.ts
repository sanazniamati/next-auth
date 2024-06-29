/** @format */

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
  //   code: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email("ایمیل الزامی است"),
  password: z.string().min(6, "Mininum of 6 characters required"),
  name: z.string().min(1, "sanaz name is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
