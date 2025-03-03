import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/api/api"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed" | "lost"
  value: number
  assignedTo: string
  notes: string
  createdAt: string
}

interface LeadsState {
  leads: Lead[]
  selectedLead: Lead | null
  isLoading: boolean
  error: string | null
}

const initialState: LeadsState = {
  leads: [],
  selectedLead: null,
  isLoading: false,
  error: null,
}

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload
    },
    selectLead: (state, action: PayloadAction<Lead>) => {
      state.selectedLead = action.payload
    },
    clearSelectedLead: (state) => {
      state.selectedLead = null
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: string; status: Lead["status"] }>) => {
      const { id, status } = action.payload
      const lead = state.leads.find((lead) => lead.id === id)
      if (lead) {
        lead.status = status
      }
    },
  },
})

export const { setLeads, selectLead, clearSelectedLead, updateLeadStatus } = leadsSlice.actions

export default leadsSlice.reducer

// Leads API endpoints
export const leadsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], void>({
      query: () => "/leads",
      providesTags: ["Leads"],
    }),
    getLeadById: builder.query<Lead, string>({
      query: (id) => `/leads/${id}`,
      providesTags: (result, error, id) => [{ type: "Leads", id }],
    }),
    createLead: builder.mutation<Lead, Omit<Lead, "id" | "createdAt">>({
      query: (lead) => ({
        url: "/leads",
        method: "POST",
        body: lead,
      }),
      invalidatesTags: ["Leads"],
    }),
    updateLead: builder.mutation<Lead, Partial<Lead> & { id: string }>({
      query: ({ id, ...lead }) => ({
        url: `/leads/${id}`,
        method: "PATCH",
        body: lead,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Leads", id }],
    }),
    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/leads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leads"],
    }),
  }),
})

export const {
  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApi

