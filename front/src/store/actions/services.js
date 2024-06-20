import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const servicesListRequest = createAsyncThunk('services/servicesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.servicesList(arg);
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