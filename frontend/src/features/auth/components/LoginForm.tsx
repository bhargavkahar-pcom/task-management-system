import { Alert, Button, Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { authApi } from "@/api/auth.api";
import { authStorage } from "@/features/auth.storage";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginFormValues,

    onSubmit: async ({ value }) => {
      setServerError(null);

      const validationResult = loginSchema.safeParse(value);

      if (!validationResult.success) {
        return;
      }

      try {
        const { user, tokens } = await authApi.login(validationResult.data);

        authStorage.setAuth(
          {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
          user,
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
              "Unable to login. Please check your credentials.",
          );

          return;
        }

        setServerError("Unable to login. Please try again.");
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

        <form.Field name="email">
          {(field) => (
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              error={
                field.state.meta.isTouched &&
                !loginSchema.shape.email.safeParse(field.state.value).success
              }
              helperText={
                field.state.meta.isTouched
                  ? loginSchema.shape.email.safeParse(field.state.value).success
                    ? ""
                    : loginSchema?.shape?.email?.safeParse(field.state.value)
                        .error?.issues[0]?.message
                  : ""
              }
              autoComplete="email"
            />
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              error={
                field.state.meta.isTouched && field.state.value.length === 0
              }
              helperText={
                field.state.meta.isTouched && field.state.value.length === 0
                  ? "Password is required."
                  : ""
              }
              autoComplete="current-password"
            />
          )}
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
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          )}
        </form.Subscribe>
      </Stack>
    </form>
  );
}
