import { put, call, takeLatest } from 'redux-saga/effects';
import { setUser } from '../../Slices/Worker/info';
import { setProvider } from '../../Slices/Provider/info';
import { doneProfile, updateProfile } from '../../Slices/Auth/auth';
import axios from 'axios';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* editProfileInfo({ payload }) {
    const { api_token, ar_username, username, email, phone } = payload
    var fd = new FormData()
    fd.append("api_token", api_token)
    fd.append("username", username)
    fd.append("ar_username", ar_username)
    fd.append("email", email)
    fd.append("phone", phone)
    try {
        const { data } = yield call(axios.post, provider_api + 'updateProfile' + `?lang=${I18n.locale}`, fd);
        if (data.status == 0) {
            const { message } = data
            console.log("editProfileInfo Saga Error : ", message)
            Toast.show({ text: message })
        }
        else {
            const profile = data
            console.log("editProfileInfo Saga Data : ", profile)
            yield put(doneProfile())
            Toast.show({ text: profile.message })
            if (profile.data.type == 'coffee' || profile.data.type == 'chef') {
                yield put(setUser({ user: profile.data }))  //setting worker
            } else {
                yield put(setProvider({ provider: profile.data })) //setting provider
            }
        }
    } catch ({ message }) {
        console.log("editProfileInfo Saga Error : ", message)
        Toast.show({ text: message })
    }
}

export function* watchEditProfile() {
    yield takeLatest(updateProfile.type, editProfileInfo)
}