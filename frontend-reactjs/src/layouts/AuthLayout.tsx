import type { ReactNode } from "react";
import { Box, Container, Paper } from "@mui/material";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },
            borderRadius: 3,
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
