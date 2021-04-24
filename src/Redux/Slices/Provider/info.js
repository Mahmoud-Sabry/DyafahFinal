import { createSlice } from '@reduxjs/toolkit';
import { Toast } from 'native-base';

const providerInfo = createSlice({
    name: "providerInfo",
    initialState: {
        provider: null,
        newLoading: false,
        newOrders: [],
        preparingLoading: false,
        preparingOrders: [],
        finishedLoading: false,
        finishedOrders: [],
        offersLoading: false,
        offers: [],
        productsLoading: false,
        products: [],
        kashtaCategories: [],
        eatingCategories: [],
        loading: false,
        success: false,
        fail: false,
        error: '',
        // Add Car
        addCarLoading: false,
        // Edit Car
        editCarLoading: false,
        // Product Details
        productDetails: null,
        productDetailsLoading: false,
        // Add Offer
        offerItem: null,
        editoffer: false,
        addOfferLoading: false,
        // Add Place
        addPlaceLoading: false,
        // Add Eating
        addEatingLoading: false,
        // Orders
        ordersLoading: false,
        changeLoading: false,
        // provider rates
        loadingRates: false,
        providerRates: [],
    },
    reducers: {
        setProvider(state, action) {
            const { provider } = action.payload
            state.provider = provider
        },
        getNewOrders(state) {
            state.newLoading = true
        },
        setNewOrders(state, action) {
            const { orders } = action.payload
            state.newOrders = orders
            state.newLoading = false
        },
        getPreparingOrders(state) {
            state.preparingLoading = true
        },
        setPreparingOrders(state, action) {
            const { orders } = action.payload
            state.preparingOrders = orders
            state.preparingLoading = false
        },
        getFinishedOrders(state) {
            state.finishedLoading = true
        },
        setFinishedOrders(state, action) {
            const { orders } = action.payload
            state.finishedOrders = orders
            state.finishedLoading = false
        },
        getOffers(state) {
            state.offersLoading = true
        },
        setOffers(state, action) {
            const { offers } = action.payload
            state.offers = offers
            state.offersLoading = false
        },
        getProducts(state) {
            state.productsLoading = true
        },
        setProducts(state, action) {
            const { products } = action.payload
            state.products = products
            state.productsLoading = false
        },
        // Eating Categories
        setKashtaCategories(state, action) {
            const { categories } = action.payload
            state.kashtaCategories = categories
        },
        setEatingCategories(state, action) {
            const { categories } = action.payload
            state.eatingCategories = categories
        },
        // Car Provider
        addCar(state, action) {
            // alert("Loading Car...")
            state.addCarLoading = true
        },
        editCar(state, action) {
            // alert("Loading Car...")
            state.editCarLoading = true
        },
        doneEdit(state, action) {
            const { newCar, e } = action.payload
            let found = false
            let index = 0
            state.products.forEach(car => {
                if (car.id == newCar.id) {
                    state.products[index] = newCar
                    found = true
                }
                index++
            });
            found ? null : state.products.push(newCar)
            Toast.show({ text: e, type: 'success' })
            state.addCarLoading = false
            state.editCarLoading = false
        },
        failEditCar(state, action) {
            const { e } = action.payload
            state.addCarLoading = false
            Toast.show({ text: e, type: 'danger' })
        },
        getProduct(state, action) {
            state.productDetailsLoading = true
            state.productDetails = null
        },
        deleteProduct(state, action) {
            // alert("Deleting...")
            // state.addCarLoading = true
        },
        setProductDetails(state, action) {
            const { product } = action.payload
            state.productDetails = product;
            state.productDetailsLoading = false
        },// Offers
        setOfferItem(state, action) {
            const { item, edit } = action.payload
            state.offerItem = item
            state.editoffer = edit
        },
        addNewOffer(state, action) {
            state.addOfferLoading = true
        },
        updateOffer(state, action) {
            state.addOfferLoading = true
        },
        deleteOffer(state, action) {
            state.addOfferLoading = true
        },
        successOffer(state, action) {
            state.addOfferLoading = false
        },// Place Provider
        addPlace(state, action) {
            // alert("Loading Place...")
            // Toast.show({ text: "Adding Place..." })
            state.addPlaceLoading = true
        },
        editPlace(state, action) {
            // alert("Loading Place...")
            // Toast.show({ text: "Editing Place..." })
            state.addPlaceLoading = true
        },
        successPlaceEdit(state, action) {
            const { newPlace } = action.payload
            let index = 0
            let found = false
            if (state.products.length > 0) {
                state.products.forEach(place => {
                    if (place.id == newPlace.id) {
                        state.products[index] = newPlace
                        found = true
                    }
                    index++
                });
            }
            found ? null : state.products.push(newPlace)
            state.addPlaceLoading = false
            // alert("Done.")
            // Toast.show({ text: "Done", type: 'success' })
        },
        failPlaceEdit(state, action) {
            console.log("failPlaceEdit called!")
            const { e } = action.payload
            state.addPlaceLoading = false
            // alert(e)
            Toast.show({ text: e, type: 'danger' })
        },
        // Eating Provider
        addEating(state, action) {
            // alert("Uploading Eating...")
            // Toast.show({ text: "Adding Meal..." })
            state.addEatingLoading = true
        },
        editEating(state, action) {
            // alert("Uploading Eating...")
            // Toast.show({ text: "Editing Meal..." })
            state.addEatingLoading = true
        },
        successEating(state, action) {
            const { newEating } = action.payload
            let index = 0
            let found = false
            if (state.products.length > 0) {
                state.products.forEach(eating => {
                    if (eating.id == newEating.id) {
                        state.products[index] = newEating
                        found = true
                    }
                    index++
                });
            }
            found ? null : state.products.push(newEating)
            state.addEatingLoading = false
            // alert("Done.")
            // Toast.show({ text: "Done", type: 'success' })
        },
        failEating(state, action) {
            const { e } = action.payload
            Toast.show({ text: e, type: 'danger' })
            state.addEatingLoading = false
        },
        // Orders
        acceptOrder(state, action) {
            // const { } = action.payload
            // Toast.show({ text: 'Loading', type: 'warning' })
            state.ordersLoading = true
        },
        failOrder(state, action) {
            // const { } = action.payload
            state.ordersLoading = false
        },
        doneOrder(state, action) {
            const { id, type } = action.payload
            let orders = []
            let newOrder = {}
            state.newOrders.forEach(order => {
                if (order.id == id) {
                    newOrder = { ...order, status: 'accepted' }
                } else
                    orders.push(order)
            })
            state.newOrders = orders;
            type == 'accepted' ? state.preparingOrders = [...state.preparingOrders, newOrder] : null
            state.ordersLoading = false
        },
        changeOrder(state, action) {
            // const {  } = action.payload
            state.changeLoading = true
        },
        orderChanged(state, action) {
            const { id, newStatus } = action.payload
            if (newStatus == 'complete') {
                let orders = []
                let newOrder = null
                state.preparingOrders.forEach(order => {
                    if (order.id != id) { orders.push(order) }
                    else { newOrder = { ...order, status: newStatus } }
                })
                state.finishedOrders = [...state.finishedOrders, newOrder]
                state.preparingOrders = orders
            } else {
                let orders = []
                state.preparingOrders.forEach((order) => {
                    if (order.id == id) {
                        orders.push({ ...order, status: newStatus })
                    } else { orders.push(order) }
                })
                state.preparingOrders = orders
            }
            state.changeLoading = false
        },
        changeFail(state, action) {
            state.changeLoading = false
        },
        getProviderRates(state) {
            state.loadingRates = true
        },
        setProviderRates(state, action) {
            state.providerRates = action.payload
            state.loadingRates = false
        },
        // Error
        getError(state, action) {
            const { error } = action.payload
            state.error = error
            // alert(error);
            Toast.show({ text: error, type: 'danger' })
        },
        changeSuccessStatus(state, action) {
            state.success = action.payload
        }
    }
})

export const {
    setProvider, getError,
    getNewOrders, setNewOrders,
    getPreparingOrders, setPreparingOrders,
    getFinishedOrders, setFinishedOrders,
    getOffers, setOffers,
    getProducts, setProducts,
    setEatingCategories, setKashtaCategories,
    addCar, editCar, doneEdit, failEditCar,
    getProduct, setProductDetails, deleteProduct,
    setOfferItem, addNewOffer, updateOffer, deleteOffer, successOffer,
    addPlace, editPlace, successPlaceEdit, failPlaceEdit,
    addEating, editEating, successEating, failEating,
    acceptOrder, doneOrder, failOrder,
    changeOrder, orderChanged, changeFail,
    changeSuccessStatus,
    getProviderRates, setProviderRates,
} = providerInfo.actions;

export default providerInfo.reducer;