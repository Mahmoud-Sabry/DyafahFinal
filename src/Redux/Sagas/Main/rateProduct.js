import { takeLatest, put, call } from 'redux-saga/effects';
import { rateProduct, productRated, getOrderDetails } from '../../Slices/Main/appUser';
import axios from 'axios';
import { product_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* ratingProduct({ payload }) {
    const { api_token, id, rate, role, order_id } = payload
    console.log('ratingProduct payload: ', payload)
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('product_id', id)
    fd.append('rate', rate)
    fd.append('type', role)
    try {
        const { data } = yield call(axios.post, product_api + 'rate' + `?lang=${I18n.locale}`, fd)
        console.log("ratingProduct response: ", data)
        const { status, message } = data
        status == 1 ? yield put(productRated()) : yield put(productRated())
        status == 1 ? yield put(getOrderDetails({ api_token, order_id })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("ratingProduct Error: ", e)
        yield put(productRated())
    }
}

export function* watchRatingProduct() {
    yield takeLatest(rateProduct.type, ratingProduct)
}