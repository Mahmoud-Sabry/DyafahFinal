import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { changeOrder, orderChanged, changeFail } from '../../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_order } from '../../../../assets/consts';
import I18n from '../../../../languages/I18n';

export function* changeOrderStatus({ payload }) {
    console.log("changeOrderStatus payload ", payload)
    const { api_token, order_id, newStatus } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("order_id", order_id);
    fd.append("status", newStatus);
    try {
        const response = yield call(axios.post, provider_order + 'changeOrderStatus' + `?lang=${I18n.locale}`, fd);
        console.log("Response from api ", response.data);
        const { status, message } = response.data
        status != 0 ? yield put(orderChanged({ id: order_id, newStatus })) : yield put(changeFail())
        status != 0 ? Toast.show({ text: message, type: 'success' }) : Toast.show({ text: message, type: 'danger' })
    } catch (message) {
        console.log("changeOrderStatus Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("changeOrderStatus Saga Error")
        Toast.show({ text: "changeOrderStatus Saga Error", type: 'danger' })
    }
}

export function* watchChangeOrderStatus() {
    yield takeLatest(changeOrder.type, changeOrderStatus)
}
