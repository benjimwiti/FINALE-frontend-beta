import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';

export interface AuthState {
    token: string | null;
    user: User | null; // Define your user interface here
}

export interface User {
    name: string;
    email: string;
    // Add other user properties as needed
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logOut: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;



export default authSlice.reducer;
