import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const travailEntity = createEntityAdapter({
    selectId: item => item.id
});

const initialState = travailEntity.getInitialState({
    reqStatus: 'idle',
    count: 0,
    error: null
});

export const getTravaux = createAsyncThunk(
    'travail/get all',
    async () => {
        const response = await axios.get('/travail');
        return response.data;
    }
);

export const { reducer } = createSlice({
    name: 'travail',
    initialState,
    extraReducers: {
        [getTravaux.pending]: (state, action) => {
            state.serviceReqStatus = 'pending';
        },
        [getTravaux.fulfilled]: (state, action) => {
            state.serviceReqStatus = 'fulfilled';
            travailEntity.upsertMany(state, action.payload.travaux);
            state.count = action.payload.count;
        },
        [getTravaux.failed]: (state, action) => {
            state.serviceReqStatus = 'failed';
        },
    }
});

export const {
    selectAll,
    selectById,
} = travailEntity.getSelectors(state => state.travaux);

export const getReqStatus = state => state.travaux.reqStatus;
export const getError = state => state.travaux.error;
export const getCount = state => state.travaux.count;
