import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { deleteOffer } from '../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* deleteProviderOffer({ payload }) {
    console.log("deleteOffer payload ", payload);
    const { api_token, product_id } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("product_id", product_id);
    try {
        const response = yield call(axios.post, provider_api + 'deleteOffer' + `?lang=${I18n.locale}`, fd);
        console.log("Response from api ", response.data);
        const { status, message } = response.data
        status != 0 ? Toast.show({ text: message, buttonText: 'Okay' }) : Toast.show({ text: message, buttonText: 'Okay' })
    } catch (message) {
        console.log("deleteOffer Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("deleteOffer Saga Error")
        Toast.show({ text: message, buttonText: 'Okay' })
    }
}

export function* watchDeleteProviderOffer() {
    yield takeLatest(deleteOffer.type, deleteProviderOffer)
}
