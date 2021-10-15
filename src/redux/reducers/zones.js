import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const zoneEntity = createEntityAdapter({
    selectId: item => item.id
});

const initialState = zoneEntity.getInitialState({
    reqStatus: 'idle',
    error: null
});

export const getZones = createAsyncThunk(
    'zones/get all',
    async () => {
        const response = await axios.get('/zone');
        return response.data;
    }
);

export const { reducer } = createSlice({
    name: 'zones',
    initialState,
    extraReducers: {
        [getZones.pending]: (state, action) => {
            state.reqStatus = 'pending';
        },
        [getZones.fulfilled]: (state, action) => {
            state.reqStatus = 'fulfilled';
            zoneEntity.upsertMany(state, action.payload);
        },
        [getZones.failed]: (state, action) => {
            state.reqStatus = 'failed';
        },
    }
});

export const {
    selectAll,
    selectById,
} = zoneEntity.getSelectors(state => state.zones);

export const getReqStatus = state => state.zones.reqStatus;
export const getError = state => state.zones.error;