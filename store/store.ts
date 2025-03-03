import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "@/api/api"
import authReducer from "@/features/auth/authSlice"
import customersReducer from "@/features/customers/customersSlice"
import leadsReducer from "@/features/leads/leadsSlice"
import tasksReducer from "@/features/tasks/tasksSlice"
import uiReducer from "@/features/ui/uiSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    customers: customersReducer,
    leads: leadsReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

