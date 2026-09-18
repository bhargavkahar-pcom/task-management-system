import { Box, Typography } from "@mui/material";

export function AppLogo() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Task Management
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Manage your tasks efficiently
      </Typography>
    </Box>
  );
}
