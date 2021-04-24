import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
    name: "auth",
    initialState: {
        photoLoading: false,
        profileLoading: false,
        updateProfileLoading: false,
        changePassLoading: false,
    },
    reducers: {
        changePhoto(state, action) {
            // state.photoLoading = true
        },
        getProfile(state, action) {
            // state.profileLoading = true
        },
        updateProfile(state, action) {
            state.updateProfileLoading = true
        },
        doneProfile(state, action) {
            state.updateProfileLoading = false
        },
        changePassword(state, action) {
            state.changePassLoading = true
        },
        doneChangePass(state, action) {
            state.changePassLoading = false
        },
    }
})

export const {
    changePhoto,
    getProfile, updateProfile, doneProfile,
    changePassword, doneChangePass
} = auth.actions;

export default auth.reducer;