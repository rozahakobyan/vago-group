import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const partnersAddRequest = createAsyncThunk('partners/partnersAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.partnersAdd(arg);
        thunkAPI.dispatch(partnersListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const partnersListRequest = createAsyncThunk('partners/partnersListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.partnersList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const partnersDeleteRequest = createAsyncThunk('partners/partnersDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.partnersDelete(arg.id);
        thunkAPI.dispatch(partnersListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const partnersUpdateRequest = createAsyncThunk('partners/partnersUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.partnersUpdate(arg);
        thunkAPI.dispatch(partnersListRequest())
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