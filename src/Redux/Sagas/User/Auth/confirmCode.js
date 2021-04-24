import { put, call, takeLatest } from 'redux-saga/effects'
import { confirmCode, codeConfirmed } from '../../../Slices/User/home'
import { setAppUserAsync } from '../../../Slices/Main/appUser'
import axios from 'axios'
import ShowToast from '../../../../custom/Toast'
import { user_api, provider_api } from '../../../../assets/consts'
import I18n from '../../../../languages/I18n';

export function* sendConfirmCode({ payload }) {
    const { email, code, type } = payload
    const url = type ? type == 'provider' ? provider_api : user_api : user_api
    const fd = new FormData()
    fd.append('email', email)
    fd.append('code', code)
    try {
        const { data } = yield call(axios.post, url + 'confirmCode' + `?lang=${I18n.locale}`, fd);
        console.log("Data from sendConfirmCode : ", data)
        if (data.status != 0) {
            yield put(setAppUserAsync({ user: data.data }))
            // ShowToast('Done', 'success')
            yield put(codeConfirmed({ confirmed: true, user: data.data }))
        } else {
            yield put(codeConfirmed({ confirmed: false }))
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        yield put(codeConfirmed({ confirmed: false }))
        console.log("sendConfirmCode Saga Error : ", message)
        ShowToast(message, 'danger')
    }
}

export function* watchSendConfirmCode() {
    yield takeLatest(confirmCode.type, sendConfirmCode);
}