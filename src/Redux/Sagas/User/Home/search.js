import { takeLatest, put, call } from 'redux-saga/effects';
import { startSearch, setSearchResults } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getSearchResults({ payload }) {
    const { api_token, keyword, type, order, price } = payload
    const fd = new FormData();
    fd.append('api_token', api_token)
    fd.append('keyword', keyword)
    fd.append('type', type)
    fd.append('order', order)
    fd.append('price', price)
    try {
        const { data } = yield call(axios.post, home_api + 'search' + `?lang=${I18n.locale}`, fd)
        console.log("getSearchResults response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setSearchResults({ results: data.data.products.data })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getSearchResults Error: ", e)
    }
}



export function* watchGetSearchResults() {
    yield takeLatest(startSearch.type, getSearchResults)
}