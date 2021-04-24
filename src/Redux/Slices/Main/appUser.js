import { createSlice } from '@reduxjs/toolkit';
import ShowToast from '../../../custom/Toast';

const AppUser = createSlice({
    name: "AppUser",
    initialState: {
        appUser: null,
        loading: false,
        success: false,
        fail: false,
        // add to favorite
        favAdding: false,
        favorites: null,
        gettingFavs: false,
        // getting app settings
        termsCondition: null,
        privacy: null,
        aboutUs: null,
        // get profile
        profile: null,
        gettingProfile: false,
        // get past orders
        pastOrders: null,
        ordersLoading: false,
        // past order details
        orderDetails: null,
        orderLoading: false,
        // rate order
        ratingOrder: false,
        // rate product
        ratingProduct: false,
        addingComment: false,
        // cart
        cartLoading: false,
        Cart: null,
        ///////////
        productDetails: null,
        detailsLoading: false,
        //// set Notification Token
        deviceToken: null,
        tokenSent: false,
        // show cart details
        cartDetails: null,
        gettingCart: false,
        Order: null,
        // send bill
        sendingBill: false,
        // create Order
        makingOrder: false,
        orderPass: false,
    },
    reducers: {
        getAppUser(state) {
            state.loading = true
        },
        setAppUserAsync(state) {
        },
        setAppUser(state, action) {
            const { user } = action.payload
            state.appUser = user
            state.success = true
            state.loading = false
        },
        setFail(state) {
            state.loading = false
            state.fail = true
        },
        // addToFavorite
        addToFav(state) {
            state.favAdding = true
        },
        favAdded(state) {
            state.favAdding = false
        },
        getFavorites(state) {
            state.gettingFavs = true
        },
        gotFavorites(state, action) {
            const { favorites, e } = action.payload
            state.favorites = favorites ? favorites : null
            e ? ShowToast(e, 'danger') : null
            state.gettingFavs = false
        },
        // 
        getSettings(state) {
            state.termsCondition = null
            console.log("getSettings action called!")
        },
        setTermsCondition(state, action) {
            const { setting } = action.payload
            state.termsCondition = setting
        },
        setPrivacy(state, action) {
            const { setting } = action.payload
            state.privacy = setting
        },
        setAboutUS(state, action) {
            const { setting } = action.payload
            state.aboutUs = setting
        },
        // get profile
        getProfile(state) {
            state.gettingProfile = true
        },
        gotProfile(state, action) {
            const { e, profile } = action.payload
            e ? ShowToast(e, 'danger') : null
            if (profile) {
                state.profile = profile
            }
            state.gettingProfile = false
        },
        updateProfile(state) {
            state.gettingProfile = true
        },
        // past orders
        getPastOrders(state) {
            state.ordersLoading = true
        },
        gotPastOrders(state, action) {
            const { orders, e } = action.payload
            state.pastOrders = orders ? orders : null
            e ? ShowToast(e, 'danger') : null
            state.ordersLoading = false
        },
        // past order details
        getOrderDetails(state) {
            state.orderDetails = null
            state.orderLoading = true
        },
        gotOrderDetails(state, action) {
            const { details, e } = action.payload
            state.orderDetails = details ? details : null
            e ? ShowToast(e, 'danger') : null
            state.orderLoading = false
        },
        // rate order
        rateOrder(state) {
            state.ratingOrder = true
        },
        orderRated(state) {
            state.ratingOrder = false
        },
        // rate product
        rateProduct(state) {
            state.ratingProduct = true
        },
        productRated(state) {
            state.ratingProduct = false
        },
        // comment product
        addProductComment(state) {
            state.addingComment = true
        },
        productCommented(state) {
            state.addingComment = false
        },
        // checkAuth
        checkAuth(state) {
        },
        // cart
        getAsyncCart(state) {
            state.cartLoading = true
        },
        setAsyncCart(state) {
            state.cartLoading = false
        },
        setUserCart(state, action) {
            state.Cart = action.payload
            state.cartLoading = false
        },
        //////////////
        getProductDetails(state, action) {
            state.detailsLoading = true
        },
        setProductDetails(state, action) {
            const { product } = action.payload
            let found = { quantity: 1, cart: false }
            // if (product) {
            state.Cart.forEach(item => {
                if (item.product_id == product.product.id) {
                    found = { quantity: item.quantity, cart: true }
                }
            })
            state.productDetails = { ...product, ...found }
            // }
            state.detailsLoading = false
        },
        /// set Notification Token ///
        setDeviceToken(state, action) {
            const { token } = action.payload
            state.deviceToken = token
        },
        setNotifiToken(state) {
            state.tokenSent = true
        },
        // show cart details
        getCartDetails(state) {
            state.gettingCart = true
        },
        gotCartDetails(state, action) {
            const { cart, order } = action.payload
            if (order) {
                state.Order = cart == [] ? { products: [{ id: -1 }] } : cart
            } else state.cartDetails = cart
            state.gettingCart = false
        },
        sendBill(state) {
            state.sendingBill = true
        },
        billSent(state) {
            state.sendingBill = false
        },
        // make order
        creatingOrder(state) {
            state.makingOrder = true
        },
        orderCreated(state, action) {
            const { success } = action.payload
            state.Cart = success ? [] : state.Cart
            state.makingOrder = false
        },
        orderSuccess(state, action) {
            state.orderPass = action.payload
        },
    }
})

export const {
    getAppUser, setAppUser, setFail, setAppUserAsync,
    addToFav, favAdded,
    getFavorites, gotFavorites,
    getSettings, setTermsCondition, setPrivacy, setAboutUS,
    getProfile, gotProfile, updateProfile,
    getPastOrders, gotPastOrders,
    getOrderDetails, gotOrderDetails,
    rateOrder, orderRated,
    rateProduct, productRated,
    addProductComment, productCommented,
    checkAuth,
    getAsyncCart, setAsyncCart, setUserCart,
    getProductDetails, setProductDetails,
    setDeviceToken, setNotifiToken,
    getCartDetails, gotCartDetails,
    sendBill, billSent,
    creatingOrder, orderCreated, orderSuccess,
} = AppUser.actions;

export default AppUser.reducer;