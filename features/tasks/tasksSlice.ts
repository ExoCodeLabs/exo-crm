import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/api/api"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in_progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  assignedTo: string
  relatedTo: {
    type: "customer" | "lead"
    id: string
  } | null
  createdAt: string
}

interface TasksState {
  tasks: Task[]
  selectedTask: Task | null
  isLoading: boolean
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task["status"] }>) => {
      const { id, status } = action.payload
      const task = state.tasks.find((task) => task.id === id)
      if (task) {
        task.status = status
      }
    },
  },
})

export const { setTasks, selectTask, clearSelectedTask, updateTaskStatus } = tasksSlice.actions

export default tasksSlice.reducer

// Tasks API endpoints
export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
    createTask: builder.mutation<Task, Omit<Task, "id" | "createdAt">>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, Partial<Task> & { id: string }>({
      query: ({ id, ...task }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi

