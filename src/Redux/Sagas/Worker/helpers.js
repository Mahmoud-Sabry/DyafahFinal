import { take, put, call, apply, takeLatest, fork, delay } from 'redux-saga/effects';
import { setworker, setHome, setRates, setNewOrders, setCompletedOrders, setWaitingOrders } from '../../Slices/Worker/info';
import axios from 'axios';
import { Toast } from 'native-base';
import { dyafah, provider_api, provider_order } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getWorkerinfo({ payload }) {
    const { token } = payload
    var formdata = new FormData()
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'workerProduct' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getWorkerinfo Saga Error : ", message)
            // alert(message)
            Toast.show({ text: message })
            yield put(setworker({ product: {} }))
        }
        else {
            let imageList = []
            const product = data.data.product
            console.log("getWorkerinfo Saga Data : ", product)
            if (product != null) {
                yield product.images.forEach(image => {
                    imageList.push({ uri: `${dyafah}${image.image}` })
                })
                yield product.images = imageList
            }
            yield put(setworker({ product }))
        }

    } catch ({ message }) {
        console.log("getWorkerinfo Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(setworker({ product: null }))
    }
}

export function* getWorkerHome({ payload }) {
    const { token } = payload
    var formdata = new FormData()
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'workerHome' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getWorkerHome Saga Error : ", message)
            // alert(message)
            Toast.show({ text: message })
            yield put(setHome({ home: null }))
        }
        else {
            const home = data.data
            console.log("getWorkerHome Saga Data : ", home)
            yield put(setHome({ home: home }))
        }

    } catch ({ message }) {
        console.log("getWorkerHome Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(setHome({ home: null }))
    }
}

export function* getWorkerRates({ payload }) {
    const { token } = payload
    var formdata = new FormData()
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_api + 'workerRates' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getWorkerRates Saga Error : ", message)
            // alert(message)
            Toast.show({ text: message })
            yield put(setRates({ rates: [] }))
        }
        else {
            const rates = data.data
            console.log("getWorkerRates Saga Data : ", rates)
            yield put(setRates({ rates: rates }))
        }

    } catch ({ message }) {
        console.log("getWorkerRates Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(setRates({ rates: [] }))
    }
}

export function* getWorkerNewOrders({ payload }) {
    const { token } = payload
    var formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_order + 'newWorkerOrders' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getWorkerNewOrders Saga Error : ", message)
            // alert(message)
            Toast.show({ text: message })
            yield put(setNewOrders({ orders: [] }))
        }
        else {
            const orders = data.data
            yield put(setNewOrders({ orders }))
            console.log("getWorkerNewOrders Saga Data : ", orders)
        }

    } catch ({ message }) {
        console.log("getWorkerNewOrders Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(setNewOrders({ orders: [] }))
    }
}

export function* getWorkerWaitingOrders({ payload }) {
    const { token } = payload
    var formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_order + 'waitingWorkerOrders' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getWorkerWaitingOrders Saga Error : ", message)
            // alert(message)
            Toast.show({ text: message })
            yield put(setWaitingOrders({ orders: [] }))
        }
        else {
            const orders = data.data
            yield put(setWaitingOrders({ orders }))
            console.log("getWorkerWaitingOrders Saga Data : ", orders)
        }

    } catch ({ message }) {
        console.log("getWorkerWaitingOrders Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(setWaitingOrders({ orders: [] }))
    }
}

export function* getWorkerCompletedOrders({ payload }) {
    const { token } = payload
    var formdata = new FormData();
    formdata.append("api_token", token)
    try {
        const { data } = yield call(axios.post, provider_order + 'completedWorkerOrders' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getWorkerCompletedOrders Saga Error : ", message)
            // alert(message)
            Toast.show({ text: message })
            yield put(setCompletedOrders({ orders: [] }))
        }
        else {
            const orders = data.data
            yield put(setCompletedOrders({ orders }))
            console.log("getWorkerCompletedOrders Saga Data : ", orders)
        }

    } catch ({ message }) {
        console.log("getWorkerCompletedOrders Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(setCompletedOrders({ orders: [] }))
    }
}