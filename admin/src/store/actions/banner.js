import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const bannerAddRequest = createAsyncThunk('info/bannerAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.bannerAdd(arg);
        thunkAPI.dispatch(bannerListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const bannerListRequest = createAsyncThunk('info/bannerListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.bannerList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const bannerDeleteRequest = createAsyncThunk('info/bannerDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.bannerDelete(arg.id);
        thunkAPI.dispatch(bannerListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const bannerUpdateRequest = createAsyncThunk('info/bannerUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.bannerUpdate(arg);
        thunkAPI.dispatch(bannerListRequest())
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