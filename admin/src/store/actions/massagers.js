import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const massagerAddRequest = createAsyncThunk('massagers/massagerAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.massagerAdd(arg);
        thunkAPI.dispatch(massagerListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const massagerListRequest = createAsyncThunk('massagers/massagerListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.massagerList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const massagerDeleteRequest = createAsyncThunk('massagers/massagerDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.massagerDelete(arg.id);
        thunkAPI.dispatch(massagerListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const massagerUpdateRequest = createAsyncThunk('massagers/massagerUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.massagerUpdate(arg);
        thunkAPI.dispatch(massagerListRequest())
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