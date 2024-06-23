import {createReducer} from "@reduxjs/toolkit";
import {
    isLoading,
    ourAdvantagesListRequest
} from "../actions/ourAdvantages";

const initialState = {
    ourAdvantage: {},
    errors: {},
    loading: false,
    ourAdvantagesList: [],
    status: "",
    pages: 1
};

export const ourAdvantages = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.ourAdvantage.isLoading = action.payload.arg
        })
        .addCase(ourAdvantagesListRequest.fulfilled, (state, action) => {
            const {ourAdvantages, pages} = action.payload;
            state.ourAdvantagesList = ourAdvantages;
            state.pages = pages;
        })
});