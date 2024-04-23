import {createReducer} from "@reduxjs/toolkit";
import {
    removeUserLogout,
    scrollStatus,
    userLoginRequest,
    userProfileRequest, userUpdateProfilePasswordRequest,
    userUpdateProfileRequest,
    usersListRequest, usersDeleteRequest, usersUpdateRequest, usersFindByIdRequest
} from "../actions/users";
import {Account} from "../../helpers/account";

const initialState = {
    profile: Account.getProfileStrong(),
    token: Account.getTokenStrong(),
    loading: false,
    messages: {},
    errors: {},
    usersList: [],
    total: 0,
    pages: 1,
    status: "",
    user: {}
}
export const users = createReducer(initialState, (builder) => {
    builder
        .addCase(removeUserLogout, (state) => {
            state.token = null
            state.profile = {}
        })
        .addCase(scrollStatus, (state, action) => {
            state.scrollStatus = action.payload
        })
        .addCase(userLoginRequest.pending, (state) => {
            state.loading = true
            state.errors = {}
        })
        .addCase(userLoginRequest.fulfilled, (state, action) => {
            state.loading = false
            const {token, user} = action.payload
            state.profile = user
            state.token = token
        })
        .addCase(userLoginRequest.rejected, (state, action) => {
            const {errors} = action.payload
            state.errors = errors
            state.loading = false
        })
        .addCase(userProfileRequest.fulfilled, (state, action) => {
            state.profile = action.payload
        })
        .addCase(usersFindByIdRequest.fulfilled, (state, action) => {
            const {user} = action.payload
            state.user = user
        })
        .addCase(userUpdateProfileRequest.pending, (state) => {
            state.loading = true
            state.errors = {}
        })
        .addCase(userUpdateProfileRequest.rejected, (state, action) => {
            const {errors} = action.payload
            state.errors = errors
            state.loading = false
        })
        .addCase(userUpdateProfilePasswordRequest.pending, (state) => {
            state.loading = true
            state.errors = {}
        })
        .addCase(userUpdateProfilePasswordRequest.fulfilled, (state, action) => {
            state.loading = false
            state.messages = action.payload
        })
        .addCase(userUpdateProfilePasswordRequest.rejected, (state, action) => {
            const {errors} = action.payload
            state.errors = errors
            state.loading = false
        })
        .addCase(usersListRequest.fulfilled, (state, action) => {
            const {users, total, pages} = action.payload;
            state.usersList = users;
            state.total = total;
            state.pages = pages;
            state.loading = false;
        })
        .addCase(usersListRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(usersDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(usersDeleteRequest.rejected, (state, action) => {
            const { errors } = action.payload;
            state.errors = errors;
        })
        .addCase(usersUpdateRequest.fulfilled, (state, action) => {
            const {status, user} = action.payload;
            state.status = status;
            state.user = user;
        })
        .addCase(usersUpdateRequest.rejected, (state, action) => {
            console.log(action.payload)
            // const { errors } = action.payload;
            // state.errors = errors;
        })
})
