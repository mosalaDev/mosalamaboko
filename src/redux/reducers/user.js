import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const initialState = {
    status: 'idle',
    updating: false,
    errors: null,
    user: null,
    token: null,
    connected: false,
    disconnecting: false
};

export const getConnectedUser = createAsyncThunk(
    'user/get connected one',
    async () => {
        const response = await axios.get('/auth');
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (body) => {
        const response = await axios.post('/auth/login', body);
        return response.data;
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await axios.delete('/auth/logout');
        return response.data;
    }
);

export const signupUser = createAsyncThunk(
    'user/signup',
    async (body) => {
        const response = await axios.post('/user/signup', body);
        return response.data;
    }
);

export const updateUser = createAsyncThunk(
    'user/signup',
    async (body) => {
        const response = await axios.post('/api/user/update', body);
        return response.data;
    }
);

export const { reducer, actions } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
        },
        resetErrors: (state) => {
            state.errors = null;
        }
    },
    extraReducers: {
        [getConnectedUser.pending]: (state) => {
            state.status = 'loading';
        },
        [getConnectedUser.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.user = null;
                state.connected = false;
                state.status = 'failed';
            } else {
                state.user = action.payload;
                state.connected = true;
                state.status = 'fulfilled';
            }
        },
        [getConnectedUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [loginUser.pending]: (state) => {
            state.status = 'loading';
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.user = null;
                state.connected = false;
                state.errors = action.payload;
                state.status = 'failed';
            } else {
                state.user = action.payload.user;
                state.connected = true;
                state.token = action.payload.tokens.accessToken;
                state.status = 'fulfilled';
                state.errors = null;
                localStorage.setItem('user', action.payload.tokens.accessToken);
            }
        },
        [loginUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [logoutUser.pending]: (state) => {
            state.disconnecting = true;
        },
        [logoutUser.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.errors = action.payload;
            } else {
                state.user = null;
                state.connected = false;
                state.errors = null;
                localStorage.removeItem('user');
            }
            state.disconnecting = false;
        },
        [logoutUser.rejected]: (state, action) => {
            state.disconnecting = false;
            state.errors = action.payload;
        },
        [signupUser.pending]: (state) => {
            state.status = 'loading';
        },
        [signupUser.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.user = null;
                state.errors = action.payload;
                state.status = 'failed';
            } else {
                state.status = 'fulfilled';
            }
        },
        [signupUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.errors = action.payload;
        },
        [updateUser.pending]: (state) => {
            state.updating = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            if (action.payload.code) {
                state.status = 'failed';
                state.errors = action.payload.message;
            } else {
                state.user = action.payload;
                state.status = 'fulfilled';
            }
            state.updating = false;
        },
        [updateUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.updating = false;
            state.errors = action.payload;
        },
    }
});

export const getReqStatus = state => state.user.status;
export const getErrors = state => state.user.errors;
export const getConnectionState = state => state.user.connected;
export const getUser = state => state.user.user;
export const isUpdating = state => state.user.updating;
export const isLogingOut = state => state.user.disconnecting;
export const getToken = state => state.user.token;