import { put, call, takeLatest } from 'redux-saga/effects';
import { setUser } from '../../Slices/Worker/info';
import { setProvider } from '../../Slices/Provider/info';
import { getProfile } from '../../Slices/Auth/auth';
import axios from 'axios';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getProfileInfo({ payload }) {
    const { api_token } = payload
    console.log("api_token", api_token)
    var formdata = new FormData()
    formdata.append("api_token", api_token)
    try {
        const { data } = yield call(axios.post, provider_api + 'profile' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("getProfileInfo Saga Error : ", message)
            Toast.show({ text: message, buttonText: 'Okay' })
        }
        else {
            const profile = data.data
            console.log("getProfileInfo Saga Data : ", profile)
            if (profile.type == 'coffee' || profile.type == 'chef') {
                yield put(setUser({ user: profile }))  //setting worker
            } else {
                yield put(setProvider({ provider: profile })) //setting provider
            }
        }
    } catch ({ message }) {
        console.log("getProfileInfo Saga Error : ", message)
        Toast.show({ text: message, buttonText: 'Okay' })
    }
}

export function* watchGetProfile() {
    yield takeLatest(getProfile.type, getProfileInfo)
}