import {createReducer} from '@reduxjs/toolkit';
import {
    activeNavbarToggle, createUserData,
    userLoginRequired, userProfileRequired, userRegisterRequired, userSendMessageRequired,
} from '../actions/users';
import {Account} from "../../helpers/Account";

const initialState = {
    profile: Account.getUser(),
    token: Account.getToken(),
    loading: false,
    errors: {},
    statusEditPassword: "",
    activeNavbar: false,
    status: "",
    message: ""
};
export const users = createReducer(initialState, (builder) => {
    builder
        .addCase(userLoginRequired.pending, (state) => {
            state.loading = true;
        })
        .addCase(userLoginRequired.fulfilled, (state, action) => {
            const {token, ...user} = action.payload;
            state.loading = false;
            state.profile = user;
            state.token = token;
        })
        .addCase(userLoginRequired.rejected, (state, action) => {
            const {errors} = action.payload;
            state.loading = false;
            state.errors = errors;
        })
        .addCase(userRegisterRequired.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
            state.loading = false;
        })
        .addCase(userRegisterRequired.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(userRegisterRequired.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            console.log(action.payload)
            state.loading = false;
        })
        .addCase(userProfileRequired.pending, (state) => {
            state.loading = true;
        })
        .addCase(userProfileRequired.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(userProfileRequired.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(userSendMessageRequired.fulfilled, (state, action) => {
            const {message} = action.payload;
            state.message = message;
            state.loading = false;
        })
        .addCase(userSendMessageRequired.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(userSendMessageRequired.rejected, (state, action) => {
            // const {errors} = action.payload;
            // state.errors = errors
            state.loading = false;
            console.log(action.payload)
        })
        .addCase(activeNavbarToggle,(state)=>{
            state.activeNavbar = !state.activeNavbar
        })
        .addCase(createUserData, (state) => {
            state.profile = {};
            state.token = null;
        })
});
