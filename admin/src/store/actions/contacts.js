import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Api} from "../../Api";

export const contactsAddRequest = createAsyncThunk('contacts/contactsAddRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.contactsAdd(arg);
        thunkAPI.dispatch(contactsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const contactsListRequest = createAsyncThunk('contacts/contactsListRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.contactsList(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const contactsDeleteRequest = createAsyncThunk('contacts/contactsDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.contactsDelete(arg.id);
        thunkAPI.dispatch(contactsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const contactsUpdateRequest = createAsyncThunk('contacts/contactsUpdateRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.contactsUpdate(arg);
        thunkAPI.dispatch(contactsListRequest())
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const contactsPathDeleteRequest = createAsyncThunk('contacts/contactsPathDeleteRequest', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.contactsPathDelete(arg);
        thunkAPI.dispatch(contactsListRequest())
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