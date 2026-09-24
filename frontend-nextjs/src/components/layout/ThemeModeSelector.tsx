"use client";

import { BrightnessAuto, DarkMode, LightMode } from "@mui/icons-material";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useThemeMode } from "@/providers/MuiProvider";

const themeOptions = [
  {
    value: "system",
    label: "System",
    icon: <BrightnessAuto fontSize="small" />,
  },
  {
    value: "light",
    label: "Light",
    icon: <LightMode fontSize="small" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <DarkMode fontSize="small" />,
  },
] as const;

export default function ThemeModeSelector() {
  const { mode, setMode } = useThemeMode();

  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as "system" | "light" | "dark");
  };

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: 125,
      }}
    >
      <Select
        value={mode}
        onChange={handleChange}
        aria-label="Select theme"
        sx={{
          borderRadius: 2,

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: 1,
            py: 0.75,
          },
        }}
        renderValue={(selected) => {
          const option = themeOptions.find((item) => item.value === selected);

          if (!option) {
            return "System";
          }

          return (
            <>
              {option.icon}
              {option.label}
            </>
          );
        }}
      >
        {themeOptions.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
