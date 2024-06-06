import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const minimalPricesListRequest = createAsyncThunk('minimalPrices/minimalPricesListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.minimalPricesList();
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