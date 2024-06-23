import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const carsAddRequest = createAsyncThunk('cars/carsAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.carsAdd(arg);
        thunkAPI.dispatch(carsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const carsListRequest = createAsyncThunk('cars/carsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.carsList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const carsDeleteRequest = createAsyncThunk('cars/carsDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.carsDelete(arg.id);
        thunkAPI.dispatch(carsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const carsUpdateRequest = createAsyncThunk('cars/carsUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.carsUpdate(arg);
        thunkAPI.dispatch(carsListRequest())
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