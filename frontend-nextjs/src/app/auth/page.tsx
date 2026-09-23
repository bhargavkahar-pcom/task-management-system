import { Box } from "@mui/material";

import AuthTabs from "@/components/auth/AuthTabs";

export default function AuthPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        backgroundColor: "background.default",
      }}
    >
      <AuthTabs />
    </Box>
  );
}
