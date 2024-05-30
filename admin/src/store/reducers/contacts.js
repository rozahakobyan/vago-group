import {createReducer} from "@reduxjs/toolkit";
import {
    contactsAddRequest,
    contactsDeleteRequest,
    contactsListRequest,
    contactsUpdateRequest,
    contactsPathDeleteRequest,
    isLoading
} from "../actions/contacts";

const initialState = {
    contact: {},
    errors: {},
    loading: false,
    contactsList: [],
    status: "",
};

export const contacts = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.contact.isLoading = action.payload.arg
        })
        .addCase(contactsAddRequest.fulfilled, (state, action) => {
            const {contact} = action.payload;
            state.contact = contact;
            state.loading = false;
        })
        .addCase(contactsAddRequest.pending, (state) => {
            state.loading = true;
        })
        .addCase(contactsAddRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
        .addCase(contactsListRequest.fulfilled, (state, action) => {
            const {contacts} = action.payload;
            state.contactsList = contacts;
        })
        .addCase(contactsDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(contactsDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(contactsPathDeleteRequest.fulfilled, (state, action) => {
            const {status} = action.payload;
            state.status = status;
        })
        .addCase(contactsPathDeleteRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
        })
        .addCase(contactsUpdateRequest.fulfilled, (state, action) => {
            const {contact} = action.payload;
            state.contact = contact;
            state.loading = false;
        })
        .addCase(contactsUpdateRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(contactsUpdateRequest.rejected, (state, action) => {
            const {errors} = action.payload;
            state.errors = errors;
            state.loading = false;
        })
});