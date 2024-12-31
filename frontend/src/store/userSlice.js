// store/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userRole: 'user',
    isAuthenticated: false,
    email: '',
    id: '',
    name: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setAuthenticationStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUserDetails: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.id = action.payload.id
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.email = '';
            state.name = '';
            state.userRole = 'user';
            state.id = ''
        },
    },
});

export const { setUserRole, setAuthenticationStatus, setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
