import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { rateOrder, orderRated, getOrderDetails, getPastOrders } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* ratePastOrder({ payload }) {
    const { api_token, rate, order_id } = payload
    console.log('ratePastOrder payload: ', payload)
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('rate', rate)
    fd.append('order_id', order_id)
    try {
        const { data } = yield call(axios.post, user_api + 'rateOrder' + `?lang=${I18n.locale}`, fd)
        console.log("ratePastOrder response: ", data)
        const { status, message } = data
        if (status == 1) {
            yield put(orderRated())
            yield put(getOrderDetails({ api_token, order_id }))
            yield put(getPastOrders({ api_token }))
        } else {
            yield put(orderRated())
            ShowToast(message, 'danger')
        }
    } catch (e) {
        console.log("ratePastOrder Error: ", e)
        yield put(orderRated())
    }
}



export function* watchRatePastOrder() {
    yield takeLatest(rateOrder.type, ratePastOrder)
}