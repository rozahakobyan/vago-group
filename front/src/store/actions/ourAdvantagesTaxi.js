import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const ourAdvantagesTaxiListRequest = createAsyncThunk('ourAdvantagesTaxi/ourAdvantagesTaxiListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.ourAdvantagesTaxiList(arg);
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