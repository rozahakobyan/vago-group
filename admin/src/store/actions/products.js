import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const productsAddRequest = createAsyncThunk('products/productsAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.productsAdd(arg);
        thunkAPI.dispatch(productsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const productsListRequest = createAsyncThunk('products/productsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.productsList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const productsDeleteRequest = createAsyncThunk('products/productsDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.productsDelete(arg.id);
        thunkAPI.dispatch(productsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const productsUpdateRequest = createAsyncThunk('products/productsUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.productsUpdate(arg);
        thunkAPI.dispatch(productsListRequest())
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