import { takeLatest, put, call } from 'redux-saga/effects';
import { getFavorites, gotFavorites } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* getFavoritesData({ payload }) {
    const { api_token } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    try {
        const { data } = yield call(axios.post, user_api + 'getFavourites' + `?lang=${I18n.locale}`, fd)
        console.log("getFavoritesData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(gotFavorites({ favorites: data.data.favourites })) : yield put(gotFavorites({ e: message }))
    } catch (e) {
        console.log("getFavoritesData Error: ", e)
        yield put(gotFavorites({ e: e }))
    }
}



export function* watchGetFavoritesData() {
    yield takeLatest(getFavorites.type, getFavoritesData)
}