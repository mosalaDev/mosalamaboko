import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../config/axios';

const devisEntity = createEntityAdapter();

const initialState = devisEntity.getInitialState({
    error: null,
    status: 'idle'
});

export const getUserDevis = createAsyncThunk(
    'get user devis',
    async () => {
        const response = await axios.get('/user/devis');
        return response.data;
    }
);

export const { actions, reducer } = createSlice({
    name: 'user reservations',
    initialState,
    extraReducers: {
        [getUserDevis.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getUserDevis.fulfilled]: (state, action) => {
            const data = action.payload;
            if (data.code) {
                state.error = data.message;
                state.status = 'failed';
            } else {
                state.status = 'fulfilled';
                devisEntity.upsertMany(state, data);
                state.error = null;
            }
        },
        [getUserDevis.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    selectAll,
    selectById
} = devisEntity.getSelectors(state => state.userDevis);

export const getReqStatus = state => state.userDevis.status;
export const getError = state => state.userDevis.error;