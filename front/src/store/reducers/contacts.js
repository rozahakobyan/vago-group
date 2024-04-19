import {createReducer} from "@reduxjs/toolkit";
import {isLoading, contactsListRequest} from "../actions/contacts";

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
        .addCase(contactsListRequest.fulfilled, (state, action) => {
            const {contacts} = action.payload;
            state.contactsList = contacts;
        })
});