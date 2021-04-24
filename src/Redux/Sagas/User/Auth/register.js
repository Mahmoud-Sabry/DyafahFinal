import { take, put, call, apply, takeLatest, fork, delay } from 'redux-saga/effects';
import { registerUser, endRegister } from '../../../Slices/User/home'
import { setAppUser, setAppUserAsync } from '../../../Slices/Main/appUser'
import axios from 'axios';
import ShowToast from '../../../../custom/Toast';
import { user_api } from '../../../../assets/consts';
import RNRestart from 'react-native-restart';
import I18n from '../../../../languages/I18n';

export function* registerNewUser({ payload }) {
    const { first_name, last_name, email, phone, address, password } = payload
    const fd = new FormData()
    fd.append('first_name', first_name)
    fd.append('last_name', last_name)
    fd.append('email', email)
    fd.append('phone', phone)
    fd.append('address', address)
    fd.append('password', password)
    try {
        const { data } = yield call(axios.post, user_api + 'register' + `?lang=${I18n.locale}`, fd);
        console.log("Data from registerNewUser : ", data)
        if (data.status != 0) {
            yield put(setAppUserAsync({ user: data.data.user })) //setting user on device
            RNRestart.Restart()
            // yield put(startLogin({ phone, password }))  // login with the new user
            // yield put(setProvider({ data: data }))  //setting user on device
            // ShowToast("Done", "success")
        } else {
            yield put(endRegister())
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        console.log("registerNewUser Saga Error : ", message)
        ShowToast(message, 'danger')
    }
}

export function* watchRegisterNewUser() {
    yield takeLatest(registerUser.type, registerNewUser);
}