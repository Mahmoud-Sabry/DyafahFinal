import { createSlice } from '@reduxjs/toolkit';

const CarsList = createSlice({
    name: "carsList",
    initialState: {
        cars: [],
        carsDetails: [],
        loading: false,
        success: false,
        fail: false,
        errorMessage: '',
        network: ''
    },
    reducers: {
        getCars(state, action) {
            state.loading = true
        },
        setCars(state, action) {
            const { data } = action.payload
            state.cars = data
            state.success = true
            state.loading = false
        },
        setCar(state, action) {
            const { car } = action.payload
            state.carsDetails = [...state.carsDetails, car]
        },
        getError(state, action) {
            const { error } = action.payload
            state.errorMessage = error
            state.fail = true
            state.loading = false
        },
        setNetwork(state, action) {
            const { network } = action.payload
            state.network = network
        }
    }
})

export const { getCars, setCars, getError, setNetwork } = CarsList.actions;

export default CarsList.reducer;