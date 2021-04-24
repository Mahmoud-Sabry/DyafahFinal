import { Platform } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { updateOffer, successOffer, changeSuccessStatus } from '../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* editOffer({ payload }) {
    console.log("editOffer payload ", payload);
    const { api_token, product_id, offer_price, offer_description, ar_offer_description } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("product_id", product_id);
    fd.append("offer_price", offer_price);
    fd.append("offer_description", offer_description);
    fd.append("ar_offer_description", ar_offer_description);
    try {
        const response = yield call(axios.post, provider_api + 'updateOffer' + `?lang=${I18n.locale}`, fd);
        console.log("Response from api ", response.data);
        const { status, message } = response
        status != 0 ? yield put(successOffer()) : yield put(successOffer())
        status != 0 ? Toast.show({ text: message, type: 'success' }) : Toast.show({ text: message, type: 'danger' })
        status != 0 ? yield put(changeSuccessStatus(true)) : null
    } catch (message) {
        console.log("editOffer Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("editOffer Saga Error")
        Toast.show({ text: message, type: 'danger' })
    }
}

export function* watchUpdateOffer() {
    yield takeLatest(updateOffer.type, editOffer)
}
