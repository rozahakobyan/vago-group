import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const videoPathsAddRequest = createAsyncThunk('videoPaths/videoPathsAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.videoPathsAdd(arg);
        thunkAPI.dispatch(videoPathsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const videoPathsListRequest = createAsyncThunk('videoPaths/videoPathsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.videoPathsList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const videoPathsDeleteRequest = createAsyncThunk('videoPaths/videoPathsDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.videoPathsDelete(arg.id);
        thunkAPI.dispatch(videoPathsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const videoPathsUpdateRequest = createAsyncThunk('videoPaths/videoPathsUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.videoPathsUpdate(arg);
        thunkAPI.dispatch(videoPathsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const videoPathsPathDeleteRequest = createAsyncThunk('videoPaths/videoPathsPathDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.videoPathsPathDelete(arg);
        thunkAPI.dispatch(videoPathsListRequest())
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