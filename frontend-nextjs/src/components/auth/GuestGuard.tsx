"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authStorage } from "@/utils/auth-storage";
import { Box, CircularProgress } from "@mui/material";

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
      setIsAuthenticated(true);
      router.replace("/dashboard");
      return;
    }

    setIsAuthenticated(false);
    setIsCheckingAuth(false);
  }, [router]);

  if (isCheckingAuth || isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
