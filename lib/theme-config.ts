// Fluent UI inspired color palette
export const fluentColors = {
  light: {
    primary: {
      base: "0 120 212", // #0078D4 - Fluent blue
      foreground: "255 255 255",
    },
    secondary: {
      base: "239 246 252", // #EFF6FC - Light blue
      foreground: "0 120 212",
    },
    accent: {
      base: "0 183 195", // #00B7C3 - Teal
      foreground: "255 255 255",
    },
    success: {
      base: "16 124 16", // #107C10 - Green
      foreground: "255 255 255",
    },
    warning: {
      base: "255 185 0", // #FFB900 - Yellow
      foreground: "44 38 36",
    },
    destructive: {
      base: "232 17 35", // #E81123 - Red
      foreground: "255 255 255",
    },
    muted: {
      base: "243 242 241", // #F3F2F1 - Light gray
      foreground: "96 94 92",
    },
    background: "255 255 255",
    foreground: "33 33 33",
    card: "255 255 255",
    "card-foreground": "33 33 33",
    popover: "255 255 255",
    "popover-foreground": "33 33 33",
    border: "237 235 233",
    input: "237 235 233",
  },
  dark: {
    primary: {
      base: "0 120 212", // #0078D4 - Fluent blue
      foreground: "255 255 255",
    },
    secondary: {
      base: "43 43 43", // #2B2B2B - Dark gray
      foreground: "255 255 255",
    },
    accent: {
      base: "0 183 195", // #00B7C3 - Teal
      foreground: "255 255 255",
    },
    success: {
      base: "118 205 118", // #76CD76 - Green
      foreground: "0 0 0",
    },
    warning: {
      base: "255 185 0", // #FFB900 - Yellow
      foreground: "0 0 0",
    },
    destructive: {
      base: "232 17 35", // #E81123 - Red
      foreground: "255 255 255",
    },
    muted: {
      base: "43 43 43", // #2B2B2B - Dark gray
      foreground: "161 159 157",
    },
    background: "32 31 30", // #201F1E - Dark background
    foreground: "255 255 255",
    card: "43 43 43", // #2B2B2B - Dark card
    "card-foreground": "255 255 255",
    popover: "43 43 43",
    "popover-foreground": "255 255 255",
    border: "68 68 68",
    input: "68 68 68",
  },
}

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeSettings {
  mode: ThemeMode
  primaryColor: string
  borderRadius: "small" | "medium" | "large"
  animation: "fast" | "medium" | "slow" | "none"
}

export const defaultThemeSettings: ThemeSettings = {
  mode: "system",
  primaryColor: "blue",
  borderRadius: "medium",
  animation: "medium",
}

export const primaryColorOptions = [
  { label: "Blue", value: "blue", color: "#0078D4" },
  { label: "Purple", value: "purple", color: "#5C2D91" },
  { label: "Teal", value: "teal", color: "#00B7C3" },
  { label: "Green", value: "green", color: "#107C10" },
  { label: "Orange", value: "orange", color: "#D83B01" },
  { label: "Red", value: "red", color: "#E81123" },
]

export const borderRadiusValues = {
  small: "0.25rem",
  medium: "0.5rem",
  large: "0.75rem",
}

export const animationSpeedValues = {
  fast: "0.15s",
  medium: "0.3s",
  slow: "0.5s",
  none: "0s",
}

