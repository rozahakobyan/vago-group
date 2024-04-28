import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const servicesAddRequest = createAsyncThunk('services/servicesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.servicesAdd(arg);
        thunkAPI.dispatch(servicesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const servicesListRequest = createAsyncThunk('services/servicesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.servicesList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const servicesDeleteRequest = createAsyncThunk('services/servicesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.servicesDelete(arg.id);
        thunkAPI.dispatch(servicesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const servicesUpdateRequest = createAsyncThunk('services/servicesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.servicesUpdate(arg);
        thunkAPI.dispatch(servicesListRequest())
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