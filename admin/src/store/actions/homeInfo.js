import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const addHomeInfoRequest = createAsyncThunk('info/addHomeInfoRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.addHomeInfo(arg);
        thunkAPI.dispatch(homeInfoListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const homeInfoListRequest = createAsyncThunk('info/homeInfoListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.homeInfoList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const deleteHomeInfoRequest = createAsyncThunk('info/deleteHomeInfoRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.deleteHomeInfo(arg.id);
        thunkAPI.dispatch(homeInfoListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const updateHomeInfoRequest = createAsyncThunk('info/updateHomeInfoRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.updateHomeInfo(arg.id, arg.updateInfo);
        thunkAPI.dispatch(homeInfoListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});