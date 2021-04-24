import { createSlice } from '@reduxjs/toolkit';
import ShowToast from '../../../custom/Toast/index';
import { dyafah } from '../../../assets/consts';

const Home = createSlice({
    name: "Home",
    initialState: {
        // bottom slider
        bottomSlider: [],
        bottomLoading: false,
        // top slider
        topSlider: [],
        topLoading: false,
        // car Products
        carProducts: [],
        carsNext: false, //
        carsCurrent: 1, //
        carLoading: false,
        // kashta products
        kashtaProducts: [],
        kashtaLoading: false,
        // popular Eatings
        popularEatings: [],
        popularLoading: false,
        // chef workers
        chefs: [],
        chefsNext: false,
        chefsCurrent: 1,
        chefsLoading: false,
        // coffee workers
        coffees: [],
        coffeesNext: false,
        coffeesCurrent: 1,
        coffeeLoading: false,
        // get places products
        places: [],
        placesNext: false,
        placesCurrent: 1,
        placesLoading: false,
        // get product details
        productDetails: [],
        detailsLoading: false,
        // get reviews
        reviews: [],
        reviewsLoading: false,
        // get dates
        dates: [],
        choosenDate: false,
        datesLoading: false,
        // search
        searchResults: [],
        searchLoading: false,
        // change photo
        photoLoading: false,
        // register
        registerLoading: false,
        // login
        loginLoading: false,
        // forget Password
        forgetLoading: false,
        emailSuccess: false,
        codeSuccess: false,
        user: null,
        successLogin: false,
        changeStatus: false,
        //
        Location: '',
    },
    reducers: {
        // bottom slider
        getBottomSlider(state, action) {
            state.bottomLoading = true
        },
        setBottomSlider(state, action) {
            const { sliders } = action.payload
            let newSliders = []
            sliders.forEach(item => {
                newSliders.push({ id: item.id, url: `${dyafah}${item.image}` })
            });
            state.bottomSlider = newSliders
            state.bottomLoading = false
        },
        // top slider
        getTopSlider(state, action) {
            state.topLoading = true
        },
        setTopSlider(state, action) {
            const { sliders } = action.payload
            let newSliders = []
            sliders.forEach(item => {
                newSliders.push({ id: item.id, url: `${dyafah}${item.image}` })
            });
            state.topSlider = newSliders
            state.topLoading = false
        },
        // car products
        getCarProducts(state, action) {
            state.carLoading = true
        },
        setCarProducts(state, action) {
            const { cars, page, next } = action.payload
            state.carProducts = page > 1 ? [...state.carProducts, ...cars] : [...cars]
            state.carsCurrent = page
            state.carsNext = next
            state.carLoading = false
        },
        // kashta products
        getKashtaProducts(state, action) {
            state.kashtaLoading = true
        },
        setKashtaProducts(state, action) {
            const { eatings } = action.payload
            state.kashtaProducts = eatings
            state.kashtaLoading = false
        },
        // popular eatings products
        getPopularProducts(state, action) {
            state.popularLoading = true
        },
        setPopularProducts(state, action) {
            const { eatings } = action.payload
            state.popularEatings = eatings
            state.popularLoading = false
        },
        // chef workers
        getChefWorkers(state, action) {
            state.chefsLoading = true
        },
        setChefWorkers(state, action) {
            const { workers, page, next } = action.payload
            state.chefs = page > 1 ? [...state.chefs, ...workers] : [...workers]
            state.chefsCurrent = page
            state.chefsNext = next
            state.chefsLoading = false
        },
        // coffee workers
        getCoffeeWorkers(state, action) {
            state.coffeeLoading = true
        },
        setCoffeeWorkers(state, action) {
            const { workers, page, next } = action.payload
            state.coffees = page > 1 ? [...state.coffees, ...workers] : [...workers]
            state.coffeesCurrent = page
            state.coffeesNext = next
            state.coffeeLoading = false
        },
        // get places products
        getPlaces(state) {
            state.placesLoading = true
        },
        setPlaces(state, action) {
            const { places, page, next } = action.payload
            state.places = page > 1 ? [...state.places, ...places] : [...places]
            state.placesCurrent = page
            state.placesNext = next
            state.placesLoading = false
        },
        // get product details
        getProductDetails(state, action) {
            state.detailsLoading = true
        },
        setProductDetails(state, action) {
            const { product } = action.payload
            state.productDetails = product
            state.detailsLoading = false
        },
        // get reviews
        getReviews(state) {
            state.reviewsLoading = true
        },
        setReviews(state, action) {
            const { reviews } = action.payload
            state.reviews = reviews
            state.reviewsLoading = false
        },
        // get dates
        getDates(state) {
            state.datesLoading = true
        },
        setDates(state, action) {
            const { dates } = action.payload
            state.dates = dates
            state.datesLoading = false
        },
        updateDates(state, action) {
            const { index } = action.payload
            let newDates = []
            state.dates.forEach((item, i) => {
                if (index == i) {
                    item.status == 'choosen' ? newDates.push({ ...item, status: 'available' }) : newDates.push({ ...item, status: 'choosen' })
                    state.choosenDate = item.status == 'available' ? item.day : false
                } else newDates.push({ ...item, status: 'available' })
            })
            state.dates = newDates
        },
        // search results
        startSearch(state) {
            state.searchResults = []
            state.searchLoading = true
        },
        setSearchResults(state, action) {
            const { results } = action.payload
            state.searchResults = results
            state.searchLoading = false
        },
        // change photo
        changeUserPhoto(state) {
            state.photoLoading = true
        },
        photoChanged(state, action) {
            const { e } = action.payload
            e ? ShowToast(e, 'danger') : null
            state.photoLoading = false
        },
        /////
        changeCover(state) {
            state.photoLoading = true
        },
        deleteCover(state) {
            state.photoLoading = true
        },
        coverChanged(state, action) {
            const { e } = action.payload
            e ? ShowToast(e, 'danger') : null
            state.photoLoading = false
        },
        ///
        registerUser(state) {
            state.registerLoading = true
        },
        endRegister(state) {
            state.registerLoading = false
        },
        loginUser(state) {
            state.loginLoading = true
        },
        endLogin(state, action) {
            const { user, success } = action.payload
            state.user = user
            state.successLogin = success
            state.loginLoading = false
        },
        // send email to send code
        sendCodeEmail(state) {
            state.forgetLoading = true
        },
        emailCodeSent(state) {
            state.emailSuccess = true
            state.forgetLoading = false
        },
        resetEmailSuccess(state) {
            state.emailSuccess = false
        },
        errorCodeEmail(state) {
            state.forgetLoading = false
        },
        // sending code 
        confirmCode(state) {
            state.forgetLoading = true
        },
        codeConfirmed(state, action) {
            const { confirmed, user } = action.payload
            if (confirmed == true) {
                state.user = user ? user : null
            }
            state.codeSuccess = confirmed
            state.forgetLoading = false
        },
        // reset password
        resetPass(state) {
            state.forgetLoading = true
        },
        resetFail(state) {
            state.forgetLoading = false
        },
        // change profile pass
        changeProfilePass(state) {
            state.forgetLoading = true
        },
        profilePassChanged(state) {
            state.forgetLoading = false
        },
        changePassStatus(state, action) {
            state.changeStatus = action.payload
        },
        setLocation(state, action) {
            state.Location = action.payload
        }
    }
})

export const {
    getBottomSlider, setBottomSlider,
    getTopSlider, setTopSlider,
    getCarProducts, setCarProducts,
    getKashtaProducts, setKashtaProducts,
    getPopularProducts, setPopularProducts,
    getChefWorkers, setChefWorkers,
    getCoffeeWorkers, setCoffeeWorkers,
    getPlaces, setPlaces,
    getProductDetails, setProductDetails,
    getReviews, setReviews,
    getDates, setDates, updateDates,
    startSearch, setSearchResults,
    changeUserPhoto, photoChanged,
    registerUser, endRegister,
    loginUser, endLogin,
    sendCodeEmail, emailCodeSent, errorCodeEmail, resetEmailSuccess,
    confirmCode, codeConfirmed,
    resetPass, resetFail,
    profilePassChanged, changeProfilePass, changePassStatus,
    setLocation,
    changeCover, coverChanged, deleteCover,
} = Home.actions;

export default Home.reducer;