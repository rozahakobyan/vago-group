import {createReducer} from "@reduxjs/toolkit";
import {loginImageListRequest, isLoading} from "../actions/loginImage";

const initialState = {
    loginImage: {},
    errors: {},
    loading: false,
    loginImagesList: [],
    status: "",
};

export const loginImage = createReducer(initialState, (builder) => {
    builder
        .addCase(isLoading, (state, action) => {
            state.loginImage.isLoading = action.payload.arg
        })
        .addCase(loginImageListRequest.fulfilled, (state, action) => {
            const {loginImage} = action.payload;
            state.loginImagesList = loginImage;
            console.log(loginImage);
        })
});