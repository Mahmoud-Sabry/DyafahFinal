import { put, call, takeLatest } from 'redux-saga/effects'
import { profilePassChanged, changeProfilePass, changePassStatus } from '../../../Slices/User/home'
import axios from 'axios'
import ShowToast from '../../../../custom/Toast'
import { user_api } from '../../../../assets/consts'
import I18n from '../../../../languages/I18n';

export function* changeProfilePassword({ payload }) {
    const { api_token, old_password, password } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('old_password', old_password)
    fd.append('password', password)
    try {
        const { data } = yield call(axios.post, user_api + 'changePassword' + `?lang=${I18n.locale}`, fd);
        console.log("Data from changeProfilePassword : ", data)
        if (data.status != 0) {
            yield put(profilePassChanged())
            ShowToast(data.message, 'success')
            yield put(changePassStatus(true))
        } else {
            yield put(profilePassChanged())
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        console.log("changeProfilePassword Saga Error : ", message)
        yield put(profilePassChanged())
        ShowToast(message, 'danger')
    }
}

export function* watchChangeProfilePassword() {
    yield takeLatest(changeProfilePass.type, changeProfilePassword)
}