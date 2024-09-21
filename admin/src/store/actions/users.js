import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Account} from "../../helpers/account";
import {Api} from "../../Api";

export const removeUserLogout = createAction('remove/user', (payload) => {
    return {
        payload
    }
})
export const scrollStatus = createAction('scroll/status', (payload = null) => {
    return {
        payload
    }
});

export const userLoginRequest = createAsyncThunk('user/auth', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.login(payload)
        const {token, status, user} = data;
        const role = user.role;
        console.log(data)
        Account.sendTokenStrong(token)
        Account.sendProfileStrong(user)
        Account.sendRole(role)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});
export const userProfileRequest = createAsyncThunk('user/profile', async (_, thunkAPI) => {
    try {
        const {data} = await Api.profile()
        const {profile} = data
        Account.sendProfileStrong(profile)
        return profile
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const userForgetPassSendEmail = createAsyncThunk('user/send-email-forget', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.forgetSendEmail(payload)
        const {message} = data
        return message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const userVerificationEmailCode = createAsyncThunk('user/verification-email-code', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.verificationEmailCode(payload)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const userForgetPassword = createAsyncThunk('user/forgot-password', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.forgetPassword(payload)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const userUpdateProfileRequest = createAsyncThunk('user/update-profile', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.updateProfile(payload)
        thunkAPI.dispatch(userProfileRequest())
        console.log(data)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const userUpdateProfilePasswordRequest = createAsyncThunk('user/update-profile-password', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.forgetPasswordProfile(payload)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const usersListRequest = createAsyncThunk('user/usersListRequest', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.usersList(payload)
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});


export const usersDeleteRequest = createAsyncThunk('user/usersDeleteRequest', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.usersDelete(payload.id)
        thunkAPI.dispatch(usersListRequest(payload))
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const usersUpdateRequest = createAsyncThunk('user/usersUpdateRequest', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.usersUpdate(payload)
        thunkAPI.dispatch(usersListRequest(payload))
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const usersFindByIdRequest = createAsyncThunk('user/usersFindByIdRequest', async (payload = {}, thunkAPI) => {
    try {
        const {data} = await Api.usersFindById(payload.id)
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
