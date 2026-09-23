import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { authApi } from "@/api/auth.api";
import { authStorage } from "@/features/auth.storage";

export function DashboardPage() {
  const navigate = useNavigate();

  const user = authStorage.getUser();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // The local session must still be cleared
      // even if the API request fails.
    } finally {
      authStorage.clear();

      await navigate({
        to: "/auth",
        replace: true,
      });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>

          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.name ?? user?.email}
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Welcome back, {user?.name ?? "User"}.
        </Typography>
      </Container>
    </Box>
  );
}
