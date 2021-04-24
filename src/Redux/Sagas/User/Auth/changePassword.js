import { put, call, takeLatest } from 'redux-saga/effects'
import { resetPass, resetFail } from '../../../Slices/User/home'
import axios from 'axios'
import ShowToast from '../../../../custom/Toast'
import { user_api, provider_api } from '../../../../assets/consts'
import RNRestart from 'react-native-restart'
import I18n from '../../../../languages/I18n'

export function* resetPassword({ payload }) {
    const { api_token, password, type } = payload
    const url = type ? type == 'provider' ? provider_api : user_api : user_api
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('password', password)
    try {
        const { data } = yield call(axios.post, url + 'changePassword' + `?lang=${I18n.locale}`, fd);
        console.log("Data from resetPassword : ", data)
        if (data.status != 0) {
            RNRestart.Restart()
        } else {
            yield put(resetFail())
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        console.log("resetPassword Saga Error : ", message)
        yield put(resetFail())
        ShowToast(message, 'danger')
    }
}

export function* watchResetPassword() {
    yield takeLatest(resetPass.type, resetPassword);
}