import { createSlice } from '@reduxjs/toolkit';

const loginForm = createSlice({
    name: "loginForm",
    initialState: {
        phone: '',
        password: '',
        user: null,
        loading: false,
        success: false,
        fail: false,
        error: ''
    },
    reducers: {
        startLogin(state, action) {
            state.loading = true
        },
        successLogin(state, action) {
            const { data } = action.payload
            state.user = data
            state.loading = false
            state.success = true
        },
        getError(state, action) {
            const { error } = action.payload
            state.error = error
            state.fail = true
            state.loading = false
        },
        resetLogin(state, action) {
            state.phone = ''
            state.password = ''
            state.user = null
            state.loading = false
            state.success = false
            state.fail = false
            state.error = ''
        }
    }
})

export const { startLogin, successLogin, getError, resetLogin } = loginForm.actions;

export default loginForm.reducer;