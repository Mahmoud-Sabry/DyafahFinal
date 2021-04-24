import { takeLatest, put, call } from 'redux-saga/effects';
import { updateProfile, gotProfile } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* updateUserProfile({ payload }) {
    console.log("updateUserProfile payload: ", payload)
    const { api_token, Username, Email, Phone, Address } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('username', Username)
    fd.append('email', Email)
    fd.append('phone', Phone)
    fd.append('address', Address)
    try {
        const { data } = yield call(axios.post, user_api + 'updateProfile' + `?lang=${I18n.locale}`, fd)
        console.log("updateUserProfile response: ", data)
        const { status, message } = data
        status == 1 ? yield put(gotProfile({})) : yield put(gotProfile({ e: message }))
    } catch (e) {
        console.log("updateUserProfile Error: ", e)
    }
}

export function* watchUpdateUserProfile() {
    yield takeLatest(updateProfile.type, updateUserProfile)
}