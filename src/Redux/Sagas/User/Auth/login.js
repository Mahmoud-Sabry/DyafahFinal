import { put, call, takeLatest } from 'redux-saga/effects';
import { loginUser, endLogin } from '../../../Slices/User/home'
import { setAppUser, setAppUserAsync } from '../../../Slices/Main/appUser'
import axios from 'axios';
import ShowToast from '../../../../custom/Toast';
import { user_api } from '../../../../assets/consts';
import RNRestart from 'react-native-restart';
import I18n from '../../../../languages/I18n'

export function* loginCustomerUser({ payload }) {
    const { phone, password, page } = payload
    const fd = new FormData()
    fd.append('phone', phone)
    fd.append('password', password)
    try {
        const { data } = yield call(axios.post, user_api + 'login' + `?lang=${I18n.locale}`, fd);
        console.log("Data from loginCustomerUser : ", data)
        if (data.status != 0) {
            yield put(setAppUserAsync({ user: data.data })) //setting user on device
            yield put(setAppUser({ user: data.data }))
            yield put(endLogin({ user: data.data, success: true }))
            page == null ? RNRestart.Restart() : null
        } else {
            yield put(endLogin({ user: null, success: false }))
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        console.log("loginCustomerUser Saga Error : ", message)
        ShowToast(message, 'danger')
        yield put(endLogin({ user: null, success: false }))
    }
}

export function* watchLoginCustomerUser() {
    yield takeLatest(loginUser.type, loginCustomerUser);
}