import { createSlice } from '@reduxjs/toolkit';

import profileService from '../services/profileService';

const profileSlice = createSlice({
    name: 'profile',
    initialState: { profile: null, loading: false, error: null },
    reducers: {
        getProfileStart: (state) => { state.loading = true; },
        getProfileSuccess: (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
        },
        getProfileFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
        },
        updateProfileStart: (state) => { state.loading = true; },
        updateProfileSuccess: (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = null;
        },
        updateProfileFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
        },
    }
    });

export const {
    getProfileStart,
    getProfileSuccess,
    getProfileFailure,
    updateProfileStart,
    updateProfileSuccess,
    updateProfileFailure,
} = profileSlice.actions;

export default profileSlice.reducer;

