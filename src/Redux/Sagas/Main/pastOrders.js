import { takeLatest, put, call } from 'redux-saga/effects';
import { getPastOrders, gotPastOrders } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getPastOrdersData({ payload }) {
    const { api_token } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    try {
        const { data } = yield call(axios.post, user_api + 'getOrders' + `?lang=${I18n.locale}`, fd)
        console.log("getPastOrdersData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(gotPastOrders({ orders: data.data.orders })) : yield put(gotPastOrders({ e: message }))
    } catch (e) {
        console.log("getPastOrdersData Error: ", e)
        yield put(gotPastOrders({ e: message }))
    }
}



export function* watchGetPastOrdersData() {
    yield takeLatest(getPastOrders.type, getPastOrdersData)
}