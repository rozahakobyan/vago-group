import {createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const homeInfoListRequest = createAsyncThunk('info/homeInfoListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.homeInfoList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});