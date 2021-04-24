import { takeLatest, put, call } from 'redux-saga/effects';
import { getKashtaProducts, setKashtaProducts, getPopularProducts, setPopularProducts } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getKashtaProductsData({ payload }) {
    const { api_token } = payload
    const fd = new FormData();
    fd.append('api_token', api_token)
    fd.append('type', 'kashta')
    try {
        const { data } = yield call(axios.post, home_api + 'kashtaEatingProducts' + `?lang=${I18n.locale}`, fd)
        console.log("getKashtaProductsData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setKashtaProducts({ eatings: data.data.products.data })) : yield put(setKashtaProducts({ eatings: [] }))
    } catch (e) {
        console.log("getKashtaProductsData Error: ", e)
    }
}

export function* getPopularProductsData({ payload }) {
    const { api_token } = payload
    const fd = new FormData();
    fd.append('api_token', api_token)
    fd.append('type', 'popular_eating')
    try {
        const { data } = yield call(axios.post, home_api + 'kashtaEatingProducts' + `?lang=${I18n.locale}`, fd)
        console.log("getPopularProductsData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setPopularProducts({ eatings: data.data.products.data })) : yield put(setPopularProducts({ eatings: [] }))
    } catch (e) {
        console.log("getPopularProductsData Error: ", e)
    }
}

export function* watchGetKashtaProducts() {
    yield takeLatest(getKashtaProducts.type, getKashtaProductsData)
}

export function* watchGetPopularProducts() {
    yield takeLatest(getPopularProducts.type, getPopularProductsData)
}