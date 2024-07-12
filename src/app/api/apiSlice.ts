import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export type Task = {
  _id: string;
  title: string;
  description: string;  
  label: string;
  completed: boolean;
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

export interface RefreshResponse {
  accessToken: string;
}

export interface Headers{
  [key: string]: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000',
      credentials: 'include',
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
     }), // Adjust the base URL as needed
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    // Fetch all Tasks
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),
     // Fetch a single Task by ID
    getTaskById: builder.query<Task, string>({
      query: (id) => `/tasks/task/${id}`,
      providesTags: ['Task'],
    }),
    // Fetch User Tasks
    fetchUserTasks: builder.query<Task[], string>({
      query: (userId) => `/tasks/${userId}`,
      providesTags: ['Task'], // Adjust the endpoint URL as per your backend
    }),
    // Create a new Task
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task'],
    }),
    // Update an existing Task
    updateTask: builder.mutation<Task, { id: string; task: Partial<Task> }>({
      query: ({ id, task }) => ({
        url: `/tasks/task/${id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    // Delete a Task
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tasks/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),




    // authentication endpoints
    registerUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    
    loginUser: builder.mutation<{ token: string; user: User }, Partial<User>>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.query<RefreshResponse, void>({
      query: () => '/refresh',
    }),
    



    //user endpoints
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
    /* getAllUsers: builder.query<User[], void>({
      query: () => '/users',
      // Assuming the response shape includes `users` as an array of User objects
      transformResponse: (response: { users: User[] }) => response.users,
    }), */
    updateUserById: builder.mutation<User, { id: string; updatedUser: Partial<User> }>({
      query: ({ id, updatedUser }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: updatedUser,
      }),
    }),
    deleteUserById: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,  
  useDeleteTaskMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserByIdMutation, 
  useDeleteUserByIdMutation,
  useGetUserByIdQuery,
  useRefreshTokenQuery,
  useFetchUserTasksQuery,
  useUpdateTaskMutation
} = apiSlice;
 


