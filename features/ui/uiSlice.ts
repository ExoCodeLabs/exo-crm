import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type ThemeSettings, defaultThemeSettings } from "@/lib/theme-config"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  message: string
  duration?: number
}

interface UiState {
  notifications: Notification[]
  sidebarCollapsed: boolean
  isLoading: boolean
  themeSettings: ThemeSettings
}

// Try to load theme settings from localStorage if available
const loadThemeSettings = (): ThemeSettings => {
  if (typeof window !== "undefined") {
    const savedSettings = localStorage.getItem("themeSettings")
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings)
      } catch (e) {
        console.error("Failed to parse theme settings", e)
      }
    }
  }
  return defaultThemeSettings
}

const initialState: UiState = {
  notifications: [],
  sidebarCollapsed: false,
  isLoading: false,
  themeSettings: loadThemeSettings(),
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
      const id = Date.now().toString()
      state.notifications.push({ ...action.payload, id })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateThemeSettings: (state, action: PayloadAction<Partial<ThemeSettings>>) => {
      state.themeSettings = { ...state.themeSettings, ...action.payload }

      // Save to localStorage if available
      if (typeof window !== "undefined") {
        localStorage.setItem("themeSettings", JSON.stringify(state.themeSettings))
      }
    },
  },
})

export const { addNotification, removeNotification, toggleSidebar, setLoading, updateThemeSettings } = uiSlice.actions

export default uiSlice.reducer

