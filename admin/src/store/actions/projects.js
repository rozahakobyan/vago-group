import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const projectsAddRequest = createAsyncThunk('projects/projectsAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsAdd(arg);
        thunkAPI.dispatch(projectsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const projectsListRequest = createAsyncThunk('projects/projectsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsList();
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const projectsDeleteRequest = createAsyncThunk('projects/projectsDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsDelete(arg.id);
        thunkAPI.dispatch(projectsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const projectsUpdateRequest = createAsyncThunk('projects/projectsUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.projectsUpdate(arg);
        thunkAPI.dispatch(projectsListRequest())
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