import { takeLatest, put, call } from 'redux-saga/effects';
import { getCarProducts, setCarProducts } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getCarProductsData({ payload }) {
    const { api_token, page } = payload
    const nextPage = page ? page : 1
    const fd = new FormData()
    fd.append('api_token', api_token)
    try {
        const { data } = yield call(axios.post, home_api + 'carProducts' + `?page=${nextPage}` + `&?lang=${I18n.locale}`, fd)
        console.log("getCarProductsData response: ", data)
        const { status, message } = data
        if (status == 1) {
            const cars = data.data.products.data
            const c_page = data.data.products.current_page
            const next = data.data.products.next_page_url != null
            yield put(setCarProducts({ cars, page: c_page, next }))
        } else {
            yield put(setCarProducts({ cars: [], page: 0, next: false }))
        }
    } catch (e) {
        yield put(setCarProducts({ cars: [], page: 0, next: false }))
        console.log("getCarProductsData Error: ", e)
    }
}

export function* watchGetCarProductsData() {
    yield takeLatest(getCarProducts.type, getCarProductsData)
}