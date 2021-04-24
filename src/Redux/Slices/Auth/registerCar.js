import { createSlice } from '@reduxjs/toolkit';
import { Toast } from 'native-base';

const registerCarProvider = createSlice({
    name: "registerCar",
    initialState: {
        loading: false,
        success: false,
        fail: false,
        error: ''
    },
    reducers: {
        regCarProvider(state, action) {
            state.loading = true
        },
        setCarProvider(state, action) {
            const { data } = action.payload
            console.log("setCarProvider Slice : ", data)
            state.success = true
            state.loading = false
        },
        getError(state, action) {
            const { error } = action.payload
            console.log("CarReg getError Slice : ", error)
            Toast.show({ text: error })
            state.error = error
            state.fail = true
            state.loading = false
        },
        resetRegCar(state, action) {
            state.loading = false
            state.success = false
            state.fail = false
            state.error = ''
        }
    }
})

export const { regCarProvider, getError, setCarProvider, resetRegCar } = registerCarProvider.actions;

export default registerCarProvider.reducer;