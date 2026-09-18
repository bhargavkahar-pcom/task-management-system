import { useState } from "react";

import { Alert, Button, Stack, TextField } from "@mui/material";

import { useForm } from "@tanstack/react-form";

import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/auth.schema";

import { authApi } from "../../../api/auth.api";
import { authStorage } from "../../auth.storage";

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies RegisterFormValues,

    onSubmit: async ({ value }) => {
      setServerError(null);

      const validationResult = registerSchema.safeParse(value);

      if (!validationResult.success) {
        return;
      }

      try {
        const { name, email, password } = validationResult.data;

        const response = await authApi.register({
          name,
          email,
          password,
        });

        authStorage.setAuth(
          {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          },
          response.user,
        );

        onSuccess();
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const axiosError = error as {
            response?: {
              data?: {
                message?: string;
              };
            };
          };

          setServerError(
            axiosError.response?.data?.message ??
              "Unable to create your account.",
          );

          return;
        }

        setServerError("Unable to create your account. Please try again.");
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <Stack spacing={2.5}>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <form.Field name="name">
          {(field) => (
            <TextField
              fullWidth
              label="Full Name"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              error={
                field.state.meta.isTouched &&
                (field.state.value.trim().length < 2 ||
                  field.state.value.trim().length > 100)
              }
              helperText={
                field.state.meta.isTouched &&
                field.state.value.trim().length < 2
                  ? "Name must be at least 2 characters."
                  : ""
              }
              autoComplete="name"
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => {
            const result = registerSchema.shape.email.safeParse(
              field.state.value,
            );

            return (
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.isTouched && !result.success}
                helperText={
                  field.state.meta.isTouched && !result.success
                    ? result.error.issues[0]?.message
                    : ""
                }
                autoComplete="email"
              />
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            const result = registerSchema.shape.password.safeParse(
              field.state.value,
            );

            return (
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                error={field.state.meta.isTouched && !result.success}
                helperText={
                  field.state.meta.isTouched && !result.success
                    ? result.error.issues[0]?.message
                    : ""
                }
                autoComplete="new-password"
              />
            );
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const password = form.getFieldValue("password");

            const hasError =
              field.state.meta.isTouched &&
              (field.state.value.length === 0 ||
                field.state.value !== password);

            return (
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                error={hasError}
                helperText={
                  hasError
                    ? field.state.value.length === 0
                      ? "Please confirm your password."
                      : "Passwords do not match."
                    : ""
                }
                autoComplete="new-password"
              />
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          )}
        </form.Subscribe>
      </Stack>
    </form>
  );
}
