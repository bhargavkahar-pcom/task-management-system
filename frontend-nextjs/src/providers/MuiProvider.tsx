"use client";

import * as React from "react";

import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

type ThemeMode = "system" | "light" | "dark";

const THEME_MODE_KEY = "tms-theme-mode";

const getSystemMode = (): "light" | "dark" => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

const getStoredMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedMode = localStorage.getItem(THEME_MODE_KEY);

  if (
    storedMode === "light" ||
    storedMode === "dark" ||
    storedMode === "system"
  ) {
    return storedMode;
  }

  return "system";
};

const createAppTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },

      background:
        mode === "light"
          ? {
              default: "#f5f7fb",
              paper: "#ffffff",
            }
          : {
              default: "#0f172a",
              paper: "#1e293b",
            },
    },

    typography: {
      fontFamily: "Inter, Roboto, Arial, sans-serif",

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 700,
      },
    },

    shape: {
      borderRadius: 10,
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: "none",
          },
        },
      },
    },
  });

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<ThemeMode>("system");
  const [systemMode, setSystemMode] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const storedMode = getStoredMode();

    setMode(storedMode);
    setSystemMode(getSystemMode());

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setSystemMode(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const activeMode = mode === "system" ? systemMode : mode;

  const theme = React.useMemo(() => createAppTheme(activeMode), [activeMode]);

  const handleModeChange = React.useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem(THEME_MODE_KEY, newMode);
  }, []);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <GlobalStyles
          styles={{
            body: {
              minHeight: "100vh",
              backgroundColor: theme.palette.background.default,
              backgroundImage:
                activeMode === "light"
                  ? `
                    radial-gradient(
                      circle at 15% 20%,
                      rgba(25, 118, 210, 0.06),
                      transparent 30%
                    ),
                    radial-gradient(
                      circle at 85% 80%,
                      rgba(25, 118, 210, 0.04),
                      transparent 30%
                    )
                  `
                  : `
                    radial-gradient(
                      circle at 15% 20%,
                      rgba(144, 202, 249, 0.04),
                      transparent 30%
                    ),
                    radial-gradient(
                      circle at 85% 80%,
                      rgba(144, 202, 249, 0.03),
                      transparent 30%
                    )
                  `,
              backgroundAttachment: "fixed",
            },

            "*, *::before, *::after": {
              boxSizing: "border-box",
            },
          }}
        />

        <ThemeModeContext.Provider
          value={{
            mode,
            setMode: handleModeChange,
          }}
        >
          {children}
        </ThemeModeContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const ThemeModeContext =
  React.createContext<ThemeModeContextValue | null>(null);

export const useThemeMode = (): ThemeModeContextValue => {
  const context = React.useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside MuiProvider");
  }

  return context;
};
