import {createReducer} from "@reduxjs/toolkit";
import { ourAdvantagesTaxiListRequest,isLoading} from "../actions/ourAdvantagesTaxi";

const initialState = {
    ourAdvantageTaxi: {},
    errors: {},
    loading: false,
    ourAdvantagesTaxiList: [],
    status: "",
    pages: 1
};

export const ourAdvantagesTaxi = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.ourAdvantageTaxi.isLoading = action.payload.arg
        })
        .addCase(ourAdvantagesTaxiListRequest.fulfilled, (state, action) => {
            const {ourAdvantagesTaxi, pages} = action.payload;
            state.ourAdvantagesTaxiList = ourAdvantagesTaxi;
            state.pages = pages;
        })
});