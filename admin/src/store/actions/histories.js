import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const historiesAddRequest = createAsyncThunk('histories/historiesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.historiesAdd(arg);
        thunkAPI.dispatch(historiesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const historiesListRequest = createAsyncThunk('histories/historiesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.historiesList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const historiesDeleteRequest = createAsyncThunk('histories/historiesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.historiesDelete(arg.id);
        thunkAPI.dispatch(historiesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const historiesUpdateRequest = createAsyncThunk('histories/historiesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.historiesUpdate(arg);
        thunkAPI.dispatch(historiesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const historiesPathDeleteRequest = createAsyncThunk('histories/historiesPathDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.historiesPathDelete(arg);
        thunkAPI.dispatch(historiesListRequest())
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