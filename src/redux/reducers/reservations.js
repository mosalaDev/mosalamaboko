import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const resEntity = createEntityAdapter({
    selectId: item => item.id,
    sortComparer: (a, b) => {
        if (a.createdAt < b.createdAt) return 1; else return -1;
    }
});

const initialState = resEntity.getInitialState({
    error: null,
    status: 'idle',
    updating: false,
    canceling: false
});

export const createReservation = createAsyncThunk(
    'create reservation',
    async (data) => {
        const response = await axios.post('/reservation', data);
        return response.data;
    }
);

export const getUserReservations = createAsyncThunk(
    'get user reservations',
    async () => {
        const response = await axios.get('/user/reservations');
        return response.data;
    }
);

export const updateReservation = createAsyncThunk(
    'update reservation',
    async (resId, data) => {
        const response = await axios.post(`/reservation/${resId}/update`, data);
        return response.data;
    }
);

export const cancelReservation = createAsyncThunk(
    'cancel reservation',
    async (resId) => {
        const response = await axios.post(`/reservation/${resId}/annuler`);
        return response.data;
    }
);

export const { actions, reducer } = createSlice({
    name: 'user reservations',
    initialState,
    extraReducers: {
        [createReservation.pending]: (state, action) => {
            state.status = 'loading';
        },
        [createReservation.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data.code) {
                state.error = data.message;
                state.status = 'failed';
            } else {
                state.status = 'fulfilled';
                resEntity.upsertOne(state, data);
                state.error = null;
            }
        },
        [createReservation.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [getUserReservations.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUserReservations.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data.code) {
                state.error = data.message;
                state.status = 'failed';
            } else {
                state.status = 'fulfilled';
                resEntity.upsertMany(state, data);
                state.error = null;
            }
        },
        [getUserReservations.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [updateReservation.pending]: (state, action) => {
            state.updating = true;
        },
        [updateReservation.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data.code) {
                state.error = data.message;
            } else {
                resEntity.updateOne(state, data);
                state.error = null;
            }
            state.updating = false;
        },
        [updateReservation.rejected]: (state, action) => {
            state.updating = false;
            state.error = action.payload;
        },
        [cancelReservation.pending]: (state, action) => {
            state.canceling = true;
        },
        [cancelReservation.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data.code) {
                state.error = data.message;
            } else {
                resEntity.updateOne(state, data);
                state.error = null;
            }
            state.canceling = false;
        },
        [cancelReservation.rejected]: (state, action) => {
            state.canceling = false;
            state.error = action.payload;
        },
    }
});

export const {
    selectAll,
    selectById
} = resEntity.getSelectors(state => state.userReservations);

export const getReqStatus = state => state.userReservations.status;
export const getError = state => state.userReservations.error;
export const getCancelingState = state => state.userReservations.canceling;
export const getUpdatingState = state => state.userReservations.updating;