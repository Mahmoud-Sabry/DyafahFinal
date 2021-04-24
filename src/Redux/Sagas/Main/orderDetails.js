import { takeLatest, put, call } from 'redux-saga/effects';
import { getOrderDetails, gotOrderDetails } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getPastOrderData({ payload }) {
    const { api_token, order_id } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('order_id', order_id)
    try {
        const { data } = yield call(axios.post, user_api + 'orderDetails' + `?lang=${I18n.locale}`, fd)
        console.log("getPastOrderData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(gotOrderDetails({ details: { ...data.data, id: order_id } })) : yield put(gotOrderDetails({ e: message }))
    } catch (e) {
        console.log("getPastOrderData Error: ", e)
        yield put(gotOrderDetails({ e: message }))
    }
}



export function* watchGetPastOrderDetails() {
    yield takeLatest(getOrderDetails.type, getPastOrderData)
}