import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/api/api"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive" | "lead"
  lastContact: string
  notes: string
}

interface CustomersState {
  customers: Customer[]
  selectedCustomer: Customer | null
  isLoading: boolean
  error: string | null
}

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload
    },
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      state.selectedCustomer = action.payload
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
  },
})

export const { setCustomers, selectCustomer, clearSelectedCustomer } = customersSlice.actions

export default customersSlice.reducer

// Customers API endpoints
export const customersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      query: () => "/customers",
      providesTags: ["Customers"],
    }),
    getCustomerById: builder.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (result, error, id) => [{ type: "Customers", id }],
    }),
    createCustomer: builder.mutation<Customer, Omit<Customer, "id">>({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation<Customer, Partial<Customer> & { id: string }>({
      query: ({ id, ...customer }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: customer,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Customers", id }],
    }),
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
})

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi

