import { takeLatest, put, call } from 'redux-saga/effects';
import { sendBill, billSent } from '../../Slices/Main/appUser';
import axios from 'axios';
import { order_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* sendInvoice({ payload }) {
    const { api_token, order_id } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('order_id', order_id)
    try {
        const { data } = yield call(axios.post, order_api + 'sendInvoice' + `?lang=${I18n.locale}`, fd)
        console.log("sendInvoice response: ", data)
        const { status, message } = data
        yield put(billSent())
        status == 1 ? ShowToast(message, 'success') : ShowToast(message, 'danger')
    } catch (e) {
        console.log("sendInvoice Error: ", e)
        yield put(billSent())
    }
}



export function* watchSendInvoice() {
    yield takeLatest(sendBill.type, sendInvoice)
}