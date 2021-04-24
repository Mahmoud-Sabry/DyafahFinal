import { takeLatest, put, call } from 'redux-saga/effects';
import { addToFav, favAdded } from '../../Slices/Main/appUser';
import axios from 'axios';
import { product_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* addToFavorite({ payload }) {
    const { api_token, product_id, type } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('product_id', product_id)
    fd.append('type', type ? type : 'user')
    try {
        const { data } = yield call(axios.post, product_api + 'addToFavourite' + `?lang=${I18n.locale}`, fd)
        console.log("addToFavorite response: ", data)
        const { status, message } = data
        status == 1 ? yield put(favAdded()) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("addToFavorite Error: ", e)
    }
}

export function* watchAddToFavorite() {
    yield takeLatest(addToFav.type, addToFavorite)
}