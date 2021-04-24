import { takeLatest, put, call } from 'redux-saga/effects';
import { getProfile, gotProfile } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getUserProfile({ payload }) {
    const { api_token } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    try {
        const { data } = yield call(axios.post, user_api + 'profile' + `?lang=${I18n.locale}`, fd)
        console.log("getUserProfile response: ", data)
        const { status, message } = data
        status == 1 ? yield put(gotProfile({ profile: data.data })) :
            yield put(gotProfile({ e: message }))
    } catch (e) {
        console.log("getUserProfile Error: ", e)
    }
}

export function* watchGetUserProfile() {
    yield takeLatest(getProfile.type, getUserProfile)
}