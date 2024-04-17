import {createReducer} from "@reduxjs/toolkit";
import {homeInfoListRequest,} from "../actions/homeInfo";

const initialState = {
    info: {},
    errors: {},
    loading: false,
    infoList: [],
    status: "",
};

export const homeInfo = createReducer(initialState, (builder) => {
    builder
        .addCase(homeInfoListRequest.fulfilled, (state, action) => {
            const {info} = action.payload;
            state.infoList = info;
        })
});