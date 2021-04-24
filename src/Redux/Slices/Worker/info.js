import { createSlice } from '@reduxjs/toolkit';

const workerInfo = createSlice({
    name: "workerInfo",
    initialState: {
        user: null,
        productLoading: false,
        product: null,
        newLoading: false,
        newOrders: null,
        waitingLoading: false,
        waitingOrders: null,
        completedLoading: false,
        completedOrders: null,
        homeLoading: false,
        home: null,
        ratesLoading: false,
        rates: null,
        loading: false,
        successEditing: false,
        success: false,
        fail: false,
        error: '',
        //////
        ordersLoading: false,
        changeLoading: false,
        // 
        changingStatus: false,
    },
    reducers: {
        setUser(state, action) {
            const { user } = action.payload
            state.user = user
        },
        getWorker(state) {
            state.productLoading = true
        },
        setworker(state, action) {
            const { product } = action.payload
            state.product = product
            state.productLoading = false
        },
        getHome(state) {
            state.homeLoading = true
        },
        setHome(state, action) {
            const { home } = action.payload
            state.home = home
            state.homeLoading = false
        },
        getRates(state) {
            state.ratesLoading = true
        },
        setRates(state, action) {
            const { rates } = action.payload
            state.rates = rates
            state.ratesLoading = false
        },
        getNewOrders(state) {
            state.newLoading = true
        },
        setNewOrders(state, action) {
            const { orders } = action.payload
            state.newOrders = orders
            state.newLoading = false
        },
        getWaitingOrders(state) {
            state.waitingLoading = true
        },
        setWaitingOrders(state, action) {
            const { orders } = action.payload
            state.waitingOrders = orders
            state.waitingLoading = false
        },
        getCompletedOrders(state) {
            state.completedLoading = true
        },
        setCompletedOrders(state, action) {
            const { orders } = action.payload
            state.completedOrders = orders
            state.completedLoading = false
        },
        editInfo(state, action) {
            state.loading = true
        },
        doneEditInfo(state, action) {
            state.successEditing = action.payload
            state.loading = false
        },
        acceptOrder(state, action) {
            state.ordersLoading = true
        },
        doneOrder(state, action) {
            const { id, type } = action.payload
            console.log("doneOrder: ", id, type)
            let orders = []
            let newOrder = {}
            state.newOrders.forEach(order => {
                if (order.id == id) {
                    newOrder = order
                } else
                    orders.push(order)
            })
            state.newOrders = orders;
            type == "accepted" ? state.waitingOrders = [...state.waitingOrders, newOrder] : null
            state.ordersLoading = false
        },
        failOrder(state, action) {
            state.ordersLoading = false
        },
        changeOrder(state, action) {
            state.changeLoading = true
        },
        orderChanged(state, action) {
            const { id, newStatus } = action.payload
            if (newStatus == 'complete') {
                let orders = []
                let newOrders = state.completedOrders
                state.waitingOrders.forEach(order => {
                    if (order.id != id) { orders.push(order) }
                    else { newOrders.push(order) }
                })
                state.waitingOrders = orders
                state.completedOrders = newOrders
            }
            state.changeLoading = false
        },
        changeFail(state, action) {
            state.changeLoading = false
        },
        changeWorkerStatus(state, action) {
            const { status } = action.payload
            const newUser = state.user
            state.user = { ...newUser, available: status }
            state.changingStatus = true
        },
        workerStatusChanged(state) {
            state.changingStatus = false
        },
    }
})

export const {
    setUser,
    getHome, setHome,
    getRates, setRates,
    getWorker, setworker,
    getNewOrders, setNewOrders,
    getWaitingOrders, setWaitingOrders,
    getCompletedOrders, setCompletedOrders,
    editInfo, doneEditInfo,
    acceptOrder, doneOrder, failOrder,
    changeOrder, orderChanged, changeFail,
    changeWorkerStatus, workerStatusChanged,
} = workerInfo.actions;

export default workerInfo.reducer;