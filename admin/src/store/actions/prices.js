import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const pricesAddRequest = createAsyncThunk('prices/pricesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.pricesAdd(arg);
        thunkAPI.dispatch(pricesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const pricesListRequest = createAsyncThunk('prices/pricesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.pricesList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const pricesDeleteRequest = createAsyncThunk('prices/pricesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.pricesDelete(arg.id);
        thunkAPI.dispatch(pricesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const pricesUpdateRequest = createAsyncThunk('prices/pricesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.pricesUpdate(arg);
        thunkAPI.dispatch(pricesListRequest())
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