import { put, call, takeLatest } from 'redux-saga/effects'
import { sendCodeEmail, emailCodeSent, errorCodeEmail } from '../../../Slices/User/home'
import axios from 'axios'
import ShowToast from '../../../../custom/Toast'
import { user_api, provider_api } from '../../../../assets/consts'
import I18n from '../../../../languages/I18n';

export function* sendConfirmEmail({ payload }) {
    const { email, type } = payload
    const url = type ? type == 'provider' ? provider_api : user_api : user_api
    const fd = new FormData()
    fd.append('email', email)
    try {
        const { data } = yield call(axios.post, url + 'sendCodeEmail' + `?lang=${I18n.locale}`, fd);
        console.log("Data from sendConfirmEmail : ", data)
        if (data.status != 0) {
            // ShowToast('Done', 'success')
            yield put(emailCodeSent())
        } else {
            yield put(errorCodeEmail())
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        yield put(errorCodeEmail())
        console.log("sendConfirmEmail Saga Error : ", message)
        ShowToast(message, 'danger')
    }
}

export function* watchSendConfirmEmail() {
    yield takeLatest(sendCodeEmail.type, sendConfirmEmail);
}