import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const galleriesAddRequest = createAsyncThunk('login/galleriesAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.galleriesAdd(arg);
        thunkAPI.dispatch(galleriesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const galleriesListRequest = createAsyncThunk('login/galleriesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.galleriesList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const galleriesDeleteRequest = createAsyncThunk('login/galleriesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.galleriesDelete(arg.id);
        thunkAPI.dispatch(galleriesListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const galleriesUpdateRequest = createAsyncThunk('login/galleriesUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.galleriesUpdate(arg);
        thunkAPI.dispatch(galleriesListRequest())
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