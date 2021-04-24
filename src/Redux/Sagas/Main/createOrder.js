import { takeLatest, put, call } from 'redux-saga/effects';
import { creatingOrder, getOrderDetails, orderCreated, orderSuccess, setAsyncCart, setUserCart } from '../../Slices/Main/appUser';
import axios from 'axios';
import { order_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* createOrder({ payload }) {
    console.log("createOrder payload: ", payload)
    const { api_token, cart, address, payment_method, cartBool } = payload
    const fd = new FormData()
    cart.forEach(item => {
        fd.append('cart[]', JSON.stringify(item))
    })
    fd.append('api_token', api_token)
    fd.append('address', address)
    fd.append('payment_method', payment_method)
    try {
        const { data } = yield call(axios.post, order_api + 'makeOrder' + `?lang=${I18n.locale}`, fd)
        console.log("createOrder response: ", data)
        const { status } = data
        if (status == 1) {
            const { id } = data.data.mainOrder
            yield put(getOrderDetails({ api_token, order_id: id }))
            yield put(orderSuccess(true))
            if (cartBool) {
                yield put(orderCreated({ success: true }))
                yield put(setUserCart([]))
                yield put(setAsyncCart([]))
            } else yield put(orderCreated({ success: false }))
        } else yield put(orderCreated({ success: false }))
    } catch (e) {
        yield put(orderCreated({ success: false }))
        console.log("createOrder Error: ", e)
    }
}

export function* watchCreateOrder() {
    yield takeLatest(creatingOrder.type, createOrder)
}