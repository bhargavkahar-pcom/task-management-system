"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { authStorage } from "@/utils/auth-storage";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = authStorage.getAccessToken();

    if (!accessToken) {
      setIsAuthenticated(false);
      router.replace(`/auth?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsAuthenticated(true);
    setIsCheckingAuth(false);
  }, [pathname, router]);

  if (isCheckingAuth || !isAuthenticated) {
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
