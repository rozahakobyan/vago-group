import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const projectsListRequest = createAsyncThunk('projects/projectsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const projectsListToEndedRequest = createAsyncThunk('projects/projectsListToEndedRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsListToEnded(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const projectsListToPendingRequest = createAsyncThunk('projects/projectsListToPendingRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsListToPending(arg);
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