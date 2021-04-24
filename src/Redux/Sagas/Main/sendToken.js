import { Platform } from 'react-native';
import { takeLatest, put, call } from 'redux-saga/effects';
import { setNotifiToken } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n'

export function* sendToken({ payload }) {
    const { api_token, token } = payload
    console.log('sendToken payload: ', payload)
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('device_token', token)
    fd.append('type', Platform.OS)
    try {
        const { data } = yield call(axios.post, user_api + 'setToken' + `?lang=${I18n.locale}`, fd)
        console.log("sendToken response: ", data)
        const { status, message } = data
        // status == 1 ? yield put(orderRated()) : yield put(orderRated())
        status == 1 ? null : ShowToast(message, 'danger')
    } catch (e) {
        console.log("sendToken Error: ", e)
        // yield put(gotPastOrders({ e: message }))
    }
}



export function* watchSendToken() {
    yield takeLatest(setNotifiToken.type, sendToken)
}