import { put, call } from 'redux-saga/effects';
import { Toast } from 'native-base';
import {
    setNewOrders, setPreparingOrders, setFinishedOrders, setOffers, setProducts,
    setKashtaCategories, setEatingCategories,
    getError
} from '../../Slices/Provider/info';
import axios from 'axios';
import { provider_api, provider_order } from '../../../assets/consts'
import I18n from '../../../languages/I18n';

export function* getProviderNewOrders({ payload }) {
    const { token } = payload
    const formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_order + 'newProviderOrders' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getNewOrders Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const orders = data.data
            console.log("getNewOrders Saga Data : ", orders)
            yield put(setNewOrders({ orders }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getNewOrders Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}

export function* getProviderPreparingOrders({ payload }) {
    const { token } = payload
    const formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_order + 'preparingProviderOrders' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getPreparingOrders Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const orders = data.data
            console.log("getPreparingOrders Saga Data : ", orders)
            yield put(setPreparingOrders({ orders }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getPreparingOrders Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}

export function* getProviderFinishedOrders({ payload }) {
    const { token } = payload
    const formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_order + 'completedProviderOrders' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getFinishedOrders Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const orders = data.data
            console.log("getFinishedOrders Saga Data : ", orders)
            yield put(setFinishedOrders({ orders }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getFinishedOrders Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}

export function* getProviderOffers({ payload }) {
    const { token } = payload
    const formdata = new FormData()
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'providerOffers' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getProviderOffers Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const offers = data.data.data
            console.log("getProviderOffers Saga Data : ", offers)
            yield put(setOffers({ offers }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getProviderOffers Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}

export function* getProviderProducts({ payload }) {
    const { token } = payload
    const formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'providerProducts' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getProviderProducts Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const products = data.data.data
            console.log("getProviderProducts Saga Data : ", products)
            yield put(setProducts({ products }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getProviderProducts Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}

export function* getEatingCategories(token) {
    const formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'eatingCategories' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getEatingCategories Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const categories = data.data
            console.log("getEatingCategories Saga Data : ", categories)
            yield put(setEatingCategories({ categories }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getEatingCategories Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}

export function* getKashtaCategories(token) {
    const formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'kastaCategories' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getKashtaCategories Saga Error : ", message)
            yield put(getError({ error: message }))
        }
        else {
            const categories = data.data
            console.log("getKashtaCategories Saga Data : ", categories)
            yield put(setKashtaCategories({ categories }))
        }

    } catch ({ message }) {
        // alert(message)
        Toast.show({ text: message })
        console.log("getKashtaCategories Saga Error : ", message)
        yield put(getError({ error: message }))
    }
}