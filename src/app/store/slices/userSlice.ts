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
      /* restoreUser: (state)=>{
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
      }
      }, */
      // Add other actions as needed, e.g., clearUser for logout
    },
  });
  
  export const { setUser/* , restoreUser  */ } = userSlice.actions;

  export default userSlice.reducer;
  
  export type { UserState };