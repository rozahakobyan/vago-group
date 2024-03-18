import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const loginImageAddRequest = createAsyncThunk('info/loginImageAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.loginImageAdd(arg);
        thunkAPI.dispatch(loginImageListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const loginImageListRequest = createAsyncThunk('login/loginImageListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.loginImageList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const loginImageDeleteRequest = createAsyncThunk('login/loginImageDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.loginImageDelete(arg.id);
        thunkAPI.dispatch(loginImageListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const loginImageUpdateRequest = createAsyncThunk('login/loginImageUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.loginImageUpdate(arg.id, arg.updateLoginImage);
        thunkAPI.dispatch(loginImageListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});