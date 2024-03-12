import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const addHomeInfoRequest = createAsyncThunk('info/addHomeInfoRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.addHomeInfo(arg);
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