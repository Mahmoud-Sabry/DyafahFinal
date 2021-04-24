import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { getAppUser, setAppUser, setFail, setAppUserAsync, checkAuth, setAsyncCart } from '../../Slices/Main/appUser';
import AsyncStorage from '@react-native-community/async-storage';
import ShowToast from '../../../custom/Toast/index';
import { setUser } from '../../Slices/Worker/info';
import { setProvider } from '../../Slices/Provider/info';
import { startLogin } from '../../Slices/Auth/login';

async function AsyncSet(appUser) {
    console.log('AsyncSet: ', appUser)
    const jsonValue = JSON.stringify(appUser)
    await AsyncStorage.setItem('appUser', jsonValue)
}

export function* setAppUserData({ payload }) {
    const { user } = payload
    console.log('setAppUserData: ', user)
    try {
        if (user != null) {
            yield call(AsyncSet, user)
        } else {
            yield call(AsyncSet, { api_token: null })
        }
    } catch ({ message }) {
        console.log("Set appUserAsync Saga Error : ", message)
    }
}

export function* watchSetAppUser() {
    yield takeLatest(setAppUserAsync.type, setAppUserData)
}

export function* AsyncGet() {
    try {
        const jsonValue = yield AsyncStorage.getItem('appUser')
        if (jsonValue !== null) {
            const user = jsonValue != null ? JSON.parse(jsonValue) : { api_token: null }
            yield put(setAppUser({ user }))
            user.api_token != null ? yield put(checkAuth({ api_token: user.api_token })) : null
            const { role, type } = user ? user : ['user', 'user']
            let start = type == 'coffee' || type == 'chef' ? 'worker' :
                role == 'provider' ? 'provider' :
                    'user'
            switch (start) {
                case 'worker':
                    yield put(setUser({ user }))
                    break;
                case 'provider':
                    yield put(setProvider({ provider: user }))
                    break;
                default:
                    break;
            }
        }
        else {
            yield put(setAppUser({ user: { api_token: null } }))
        }
    } catch (error) {
        // alert("AsyncGet fn Error : ", error)
        yield put(setFail())
        ShowToast(error.message, 'danger')
        console.log("AsyncGet fn Error : ", error)
    }
}

export function* watchGetAppUser() {
    yield takeLatest(getAppUser.type, AsyncGet)
}