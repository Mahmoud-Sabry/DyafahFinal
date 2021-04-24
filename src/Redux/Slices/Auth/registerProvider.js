import { createSlice } from '@reduxjs/toolkit';

const registerProvider = createSlice({
    name: "regProvider",
    initialState: {
        loading: false,
        success: false,
        fail: false,
        error: ''
    },
    reducers: {
        regProvider(state, action) {
            state.loading = true
        },
        setProvider(state, action) {
            const { data } = action.payload
            console.log("regProvider Slice : ", data)
            state.success = true
            state.loading = false
        },
        getError(state, action) {
            const { error } = action.payload
            state.error = error
            state.fail = true
            state.loading = false
        },
        resetRegProvider(state) {
            state.loading = false
            state.success = false
            state.fail = false
            state.error = ''
        }
    }
})

export const { regProvider, getError, setProvider, resetRegProvider } = registerProvider.actions;

export default registerProvider.reducer;