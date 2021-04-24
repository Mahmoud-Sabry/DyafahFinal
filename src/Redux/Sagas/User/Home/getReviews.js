import { takeLatest, put, call } from 'redux-saga/effects';
import { getReviews, setReviews } from '../../../Slices/User/home';
import axios from 'axios';
import { product_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getReviewsData({ payload }) {
    const { id } = payload
    const fd = new FormData();
    fd.append('product_id', id)
    try {
        const { data } = yield call(axios.post, product_api + 'productRates' + `?lang=${I18n.locale}`, fd)
        console.log("getReviewsData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setReviews({ reviews: data.data.rates })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getReviewsData Error: ", e)
    }
}



export function* watchGetReviewsData() {
    yield takeLatest(getReviews.type, getReviewsData)
}