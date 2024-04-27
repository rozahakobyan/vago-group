import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const packagesAddRequest = createAsyncThunk('packages/packagesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.packagesAdd(arg);
        thunkAPI.dispatch(packagesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const packagesListRequest = createAsyncThunk('packages/packagesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.packagesList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const packagesDeleteRequest = createAsyncThunk('packages/packagesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.packagesDelete(arg.id);
        thunkAPI.dispatch(packagesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const packagesUpdateRequest = createAsyncThunk('packages/packagesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.packagesUpdate(arg);
        thunkAPI.dispatch(packagesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const isLoading = createAction('is/loading', (arg = '') => {
    return {
        payload: {
            arg
        }
    }
})