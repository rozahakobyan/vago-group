import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Account} from "../../helpers/Account";
import {Api} from "../../Api";

export const userRegisterRequired = createAsyncThunk('user/register', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.register(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const userLoginRequired = createAsyncThunk('user/login', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.login(arg);
        const {token, status, ...user} = data;
        Account.setToken(token)
        Account.setUser(user)
        Account.setLanguage("en")
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const userActivateRequired = createAsyncThunk('user/userActivateRequired', async (arg = {}, thunkAPI) => {
    try {
        const {data} = await Api.activateUser(arg);
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const userProfileRequired = createAsyncThunk('user/profile', async (arg, thunkAPI) => {
    try {
        const {data} = await Api.profile();
        const {profile} = data;
        Account.setUser(profile)
        return profile;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const sendEmailForgotPasswordRequired = createAsyncThunk("user/sendEmailForgotPasswordRequired", async (arg = {}, thunkAPI
) => {
    try{
        const { data } = await Api.sendEmailForgotPassword(arg);
        return data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const sendCodeForgotPasswordRequired = createAsyncThunk("user/sendCodeForgotPasswordRequired", async (arg = {}, thunkAPI) => {
    try{
        const { data } = await Api.sendCodeForgotPassword(arg);
        return data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const updateForgotPasswordRequired = createAsyncThunk("user/updateForgotPasswordRequired", async (arg = {}, thunkAPI) => {
    try{
        const { data } = await Api.updateForgotPassword(arg);
        return data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const userSendMessageRequired = createAsyncThunk("user/userSendMessageRequired", async (arg = {}, thunkAPI) => {
    try{
        const { data } = await Api.userSendMessage(arg);
        return data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const userSendContactMessageRequired = createAsyncThunk("user/userSendContactMessageRequired", async (arg = {}, thunkAPI) => {
    try{
        const { data } = await Api.userSendContactMessage(arg);
        return data;
    }catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
})

export const activeNavbarToggle = createAction('active/navbar',()=>{
  return{
      payload:{

      }
  }
})

export  const createUserData = createAction('remove/users',()=>{
    return{
        payload:{

        }
    }
})

