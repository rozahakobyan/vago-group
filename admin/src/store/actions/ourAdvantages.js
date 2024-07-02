import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const ourAdvantagesAddRequest = createAsyncThunk('ourAdvantages/ourAdvantagesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesAdd(arg);
        thunkAPI.dispatch(ourAdvantagesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const ourAdvantagesListRequest = createAsyncThunk('ourAdvantages/ourAdvantagesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const ourAdvantagesDeleteRequest = createAsyncThunk('ourAdvantages/ourAdvantagesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesDelete(arg.id);
        thunkAPI.dispatch(ourAdvantagesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const ourAdvantagesUpdateRequest = createAsyncThunk('ourAdvantages/ourAdvantagesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesUpdate(arg);
        thunkAPI.dispatch(ourAdvantagesListRequest())
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