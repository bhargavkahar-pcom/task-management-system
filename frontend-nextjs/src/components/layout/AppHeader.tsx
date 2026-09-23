"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import { useNotification } from "@/providers/NotificationProvider";
import { authStorage } from "@/utils/auth-storage";

interface AppHeaderProps {
  userName: string;
}

export default function AppHeader({ userName }: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { showSuccess } = useNotification();

  const handleLogout = () => {
    authStorage.clear();

    showSuccess("Logged out successfully");

    router.push("/auth");
    router.refresh();
  };

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <AppBar position="static" elevation={1} color="default">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Logo */}
            <Typography
              component={Link}
              href="/dashboard"
              variant="h6"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Task Management
            </Typography>

            {/* Navigation */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                component={Link}
                href="/dashboard"
                variant={isActive("/dashboard") ? "contained" : "text"}
              >
                Dashboard
              </Button>

              <Button
                component={Link}
                href="/tasks"
                variant={isActive("/tasks") ? "contained" : "text"}
              >
                Tasks
              </Button>
            </Box>
          </Box>

          {/* Right side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
            //  variant="body1" fontWeight={500}
            >
              {userName}
            </Typography>

            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
