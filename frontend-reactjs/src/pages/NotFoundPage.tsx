import { Box, Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h3">404</Typography>

      <Typography color="text.secondary">Page not found.</Typography>

      <Button component={Link} to="/dashboard" variant="contained">
        Go to Dashboard
      </Button>
    </Box>
  );
}
