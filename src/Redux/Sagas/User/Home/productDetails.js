import { takeLatest, put, call } from 'redux-saga/effects';
import { getProductDetails, setProductDetails } from '../../../Slices/Main/appUser';
import axios from 'axios';
import { product_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getProductDetailsData({ payload }) {
    const { api_token, role, id } = payload
    const fd = new FormData();
    fd.append('api_token', api_token)
    fd.append('type', role)
    fd.append('product_id', id)
    try {
        const { data } = yield call(axios.post, product_api + 'productDetails' + `?lang=${I18n.locale}`, fd)
        console.log("getProductDetailsData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setProductDetails({ product: data.data })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getProductDetailsData Error: ", e)
    }
}



export function* watchGetProductDetailsData() {
    yield takeLatest(getProductDetails.type, getProductDetailsData)
}