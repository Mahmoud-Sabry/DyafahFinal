import { take, put, call, apply, takeLatest, fork, delay } from 'redux-saga/effects';
import { successLogin, startLogin, getError } from '../../Slices/Auth/login';
import { setUser } from '../../Slices/Worker/info';
import { setProvider } from '../../Slices/Provider/info';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export async function _SetUser(user) {
    const jsonUser = JSON.stringify(user)
    try {
        await AsyncStorage.setItem('User', jsonUser)
    } catch ({ message }) {
        console.log("Set Lang Saga Error : ", message)
    }
}

export async function ـGetUser() {
    try {
        const value = await AsyncStorage.getItem('User')
        if (value !== null) {
            console.log("User : ", JSON.parse(value))
            return value;
        }
        else {
            console.log("No User!")
            return null;
        }
    } catch (error) {
        // alert("GetUser fn Error : ", error)
        Toast.show({ text: error, buttonText: 'Okay' })
        console.log("GetUser fn Error : ", error)
        return null;
    }
}

export function* Login({ payload }) {
    const { phone, password } = payload
    var formdata = new FormData()
    formdata.append("phone", phone)
    formdata.append("password", password)
    try {
        const { data } = yield call(axios.post, provider_api + 'login' + `?lang=${I18n.locale}`, formdata);
        console.log("Data from Login : ", data)
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            yield put(getError({ error: message }))
        }
        else {
            const user = data.data
            yield _SetUser(user)
            yield put(successLogin({ data: user }))
            if (user.type == 'coffee' || user.type == 'chef') {
                yield put(setUser({ user: user }))  //setting worker user
            } else {
                yield put(setProvider({ provider: user })) //setting provider user
            }
        }

    } catch ({ message }) {
        console.log("Login Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(getError({ error: message }))
    }
}

export function* watchLogin() {
    yield takeLatest(startLogin.type, Login)
}
