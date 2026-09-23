import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email({ message: "Please enter a valid email address." })),

  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .pipe(z.email({ message: "Please enter a valid email address." })),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters")
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
        message: "Password must contain uppercase, lowercase, and a number.",
      }),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
