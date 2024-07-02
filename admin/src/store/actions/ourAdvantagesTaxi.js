import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const ourAdvantagesTaxiAddRequest = createAsyncThunk('ourAdvantagesTaxi/ourAdvantagesTaxiAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesTaxiAdd(arg);
        thunkAPI.dispatch(ourAdvantagesTaxiListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const ourAdvantagesTaxiListRequest = createAsyncThunk('ourAdvantagesTaxi/ourAdvantagesTaxiListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesTaxiList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const ourAdvantagesTaxiDeleteRequest = createAsyncThunk('ourAdvantagesTaxi/ourAdvantagesTaxiDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesTaxiDelete(arg.id);
        thunkAPI.dispatch(ourAdvantagesTaxiListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const ourAdvantagesTaxiUpdateRequest = createAsyncThunk('ourAdvantagesTaxi/ourAdvantagesTaxiUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesTaxiUpdate(arg);
        thunkAPI.dispatch(ourAdvantagesTaxiListRequest())
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