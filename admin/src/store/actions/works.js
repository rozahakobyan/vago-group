import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const worksAddRequest = createAsyncThunk('works/worksAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.worksAdd(arg);
        thunkAPI.dispatch(worksListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const worksListRequest = createAsyncThunk('works/worksListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.worksList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const worksDeleteRequest = createAsyncThunk('works/worksDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.worksDelete(arg.id);
        thunkAPI.dispatch(worksListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const worksUpdateRequest = createAsyncThunk('works/worksUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.worksUpdate(arg);
        thunkAPI.dispatch(worksListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const schedulesDeleteRequest = createAsyncThunk('works/schedulesDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.schedulesDelete(arg);
        thunkAPI.dispatch(worksListRequest())
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