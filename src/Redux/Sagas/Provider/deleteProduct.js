import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { deleteProduct, getProducts } from '../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* deleteProviderProduct({ payload }) {
    console.log("deleteProduct payload ", payload);
    const { api_token, product_id } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("product_id", product_id);
    try {
        const response = yield call(axios.post, provider_api + 'deleteProduct' + `?lang=${I18n.locale}`, fd);
        console.log("deleteProduct Response ", response.data);
        const { status, message } = response.data
        status != 0 ? Toast.show({ text: message, type: 'success' }) : Toast.show({ text: message, type: 'danger' })
        status != 0 ? yield put(getProducts({ token: api_token })) : null
    } catch (message) {
        console.log("deleteProduct Saga Error : ", message)
        Toast.show({ text: message, type: 'danger' })
    }
}

export function* watchDeleteProviderProduct() {
    yield takeLatest(deleteProduct.type, deleteProviderProduct)
}
