import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import { AppLogo } from "@/components/common/AppLogo";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface AuthPageProps {
  onAuthenticated: () => void;
}

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [tab, setTab] = useState(0);

  return (
    <AuthLayout>
      <AppLogo />

      <Tabs
        value={tab}
        onChange={(_, value: number) => setTab(value)}
        variant="fullWidth"
        sx={{ mb: 4 }}
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <Box>
        {tab === 0 ? (
          <LoginForm onSuccess={onAuthenticated} />
        ) : (
          <RegisterForm onSuccess={() => setTab(0)} />
        )}
      </Box>
    </AuthLayout>
  );
}
