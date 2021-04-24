import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { acceptOrder, doneOrder, failOrder } from '../../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_order } from '../../../../assets/consts';
import I18n from '../../../../languages/I18n';

export function* acceptRefuseOrder({ payload }) {
    console.log("acceptRefuseOrder payload ", payload)
    const { api_token, order_id, action, type } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("order_id", order_id);
    fd.append("action", action);
    fd.append("type", type);
    try {
        const response = yield call(axios.post, provider_order + 'acceptRefusedOrder' + `?lang=${I18n.locale}`, fd);
        console.log("Response from api ", response.data);
        const { status, message } = response.data
        status != 0 ? yield put(doneOrder({ id: order_id, type: action })) : yield put(failOrder())
        status != 0 ? Toast.show({ text: message, type: 'success' }) : Toast.show({ text: message, type: 'danger' })
    } catch (message) {
        console.log("acceptRefuseOrder Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("acceptRefuseOrder Saga Error")
        Toast.show({ text: "acceptRefuseOrder Saga Error", type: 'danger' })
    }
}

export function* watchAcceptRefuseOrder() {
    yield takeLatest(acceptOrder.type, acceptRefuseOrder)
}
