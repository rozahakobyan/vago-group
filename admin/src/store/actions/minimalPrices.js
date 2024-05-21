import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const minimalPricesAddRequest = createAsyncThunk('minimalPrices/minimalPricesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.minimalPricesAdd(arg);
        thunkAPI.dispatch(minimalPricesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const minimalPricesListRequest = createAsyncThunk('minimalPrices/minimalPricesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.minimalPricesList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const minimalPricesDeleteRequest = createAsyncThunk('minimalPrices/minimalPricesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.minimalPricesDelete(arg.id);
        thunkAPI.dispatch(minimalPricesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const minimalPricesUpdateRequest = createAsyncThunk('minimalPrices/minimalPricesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.minimalPricesUpdate(arg);
        thunkAPI.dispatch(minimalPricesListRequest())
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