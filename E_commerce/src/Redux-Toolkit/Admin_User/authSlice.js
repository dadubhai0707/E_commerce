import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    admin: [
        { admin_ID: 1, Aname: 'sanjay', Alname: 'suthar', Aemail: 'sanjay@gmail.Com', adminPassword: '123123' }
    ],
    user: [
    ],
    IsAdmin: null,
    IsUser: null,
    message: '',
    error: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // _______________________________________________________
        // User Auth
        // _______________________________________________________
        Register: (state, action) => {
            state.user.push(action.payload);
        },
        UserLogin: (state, action) => {
            const foundUser = state.user.find(
                (val) => val.Uemail === action.payload.email && val.Upassword === action.payload.password
            );
            if (foundUser) {
                state.IsUser = foundUser;
                state.message = 'User successfully logged in';
            } else {
                state.message = 'User not found. Please enter valid user details';
            }
        },

        // _______________________________________________________
        // Admin Auth
        // _______________________________________________________
        AdminLogin: (state, action) => {
            const foundAdmin = state.admin.find(
                (val) => val.Aemail === action.payload.email && val.adminPassword === action.payload.password
            );
            if (foundAdmin) {
                state.IsAdmin = foundAdmin;
                state.message = 'Admin successfully logged in';
            } else {
                state.message = 'Admin not found. Please enter valid admin details';
            }
        },
         // _______________________________________________________
        // Update User Information
        // _______________________________________________________
        UpdateUser: (state, action) => {
            const index = state.user.findIndex((user) => user.Uemail === action.payload.Uemail);
            if (index !== -1) {
                state.user[index] = { ...state.user[index], ...action.payload };
                state.IsUser = state.user[index];
                state.message = 'User information updated successfully';
            } else {
                state.message = 'User not found';
            }
        },
        // _______________________________________________________
        // Same Reducer
        // _______________________________________________________
        Logout: (state) => {
            state.IsAdmin = null;
            state.message = 'Logged out successfully';
        },
        LogoutUser:(state)=>{
            state.IsUser = null;
            state.message = 'Logged out successfully';
        },
        RemoveMessage: (state) => {
            state.message = '';
        }
    }
});

export const { AdminLogin, UserLogin, Register,UpdateUser, Logout, RemoveMessage,LogoutUser } = authSlice.actions;
export default authSlice.reducer;
