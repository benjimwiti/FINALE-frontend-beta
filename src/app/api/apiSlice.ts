import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Task = {
  _id: string;
  title: string;
  description: string;  
  label: string;
  dueDate: Date;
  userId: User['_id']
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[]
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // Adjust the base URL as needed
  endpoints: (builder) => ({
    // Fetch all Tasks
    getTasks: builder.query<Task[], void>({
      query: () => 'http://localhost:8000/tasks',
    }),
     // Fetch a single Task by ID
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
    }),
    // Create a new Task
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: 'http://localhost:8000/tasks',
        method: 'POST',
        body: newTask,
      }),
    }),
    // Update an existing Task
    updateTask: builder.mutation<Task, { id: string; task: Partial<Task> }>({
      query: ({ id, task }) => ({
        url: `http://localhost:8000/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
    }),
    // Delete a Task
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `http://localhost:8000/tasks/${id}`,
        method: 'DELETE',
      }),
    }),


    // User authentication endpoints
    registerUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'http://localhost:3000/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<{ token: string; user: User }, Partial<User>>({
      query: (credentials) => ({
        url: 'http://localhost:3000/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateUser: builder.mutation<User, { updatedUser: Partial<User> }>({
      query: ({ updatedUser }) => ({
        url: `http://localhost:3000/users`,
        method: 'PUT',
        body: updatedUser,
      }),
    }), 
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation, 
} = apiSlice; 
 


