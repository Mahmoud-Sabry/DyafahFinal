import { put, call, takeLatest } from 'redux-saga/effects';
import { changePassword, doneChangePass } from '../../Slices/Auth/auth';
import axios from 'axios';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* changeAccountPassword({ payload }) {
    const { api_token, old_password, password } = payload
    const fd = new FormData();
    fd.append('api_token', api_token)
    fd.append('old_password', old_password)
    fd.append('password', password)
    try {
        const response = yield call(axios.post, provider_api + 'changePassword' + `?lang=${I18n.locale}`, fd)
        console.log("changeAccountPassword: ", response.data)
        const { status, data, message } = response.data
        if (status != 0) {
            yield put(doneChangePass())
            yield Toast.show({ text: message, type: 'success' })
        } else {
            yield put(doneChangePass())
            console.log("changeAccountPassword: ", response)
            yield Toast.show({ text: message, type: 'danger' })
        }
    } catch ({ message }) {
        yield put(doneChangePass())
        console.log("changeAccountPassword Saga Error : ", message)
        yield Toast.show({ text: message, type: 'danger' })
    }
}

export function* watchChangeAccountPassword() {
    yield takeLatest(changePassword.type, changeAccountPassword)
}