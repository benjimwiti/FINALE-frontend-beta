import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../api/apiSlice'; // Import your User type from apiSlice or define it here

interface UserState {
    currentUser: User | null;
  }
  
  const initialState: UserState = {
    currentUser: null,
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User | null>) => {
        state.currentUser = action.payload;
      },
      // Add other actions as needed, e.g., clearUser for logout
    },
  });
  
  export const { setUser } = userSlice.actions;

  export default userSlice.reducer;
  
  export type { UserState };