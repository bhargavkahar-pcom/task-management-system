"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

interface MuiProviderProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});

export default function MuiProvider({ children }: MuiProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
