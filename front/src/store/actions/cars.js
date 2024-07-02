import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const carsListRequest = createAsyncThunk('cars/carsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.carsList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const carGetByIdRequest = createAsyncThunk('cars/carGetByIdRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.carGetById(arg);
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