import { takeLatest, put, call } from 'redux-saga/effects';
import { checkAuth, setAppUserAsync } from '../../Slices/Main/appUser';
import axios from 'axios';
import { user_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import RNRestart from 'react-native-restart';
import I18n from '../../../languages/I18n';

export function* checkTokenAuth({ payload }) {
    const { api_token } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    try {
        const { data } = yield call(axios.post, user_api + 'checkAuth' + `?lang=${I18n.locale}`, fd)
        console.log("checkTokenAuth response: ", data)
        const { status, message } = data
        if (status != 1) {
            yield put(setAppUserAsync({ api_token: null }))
            RNRestart.Restart()
        }
    } catch (e) {
        console.log("checkTokenAuth Error: ", e)
        yield put(setAppUserAsync({ api_token: null }))
        RNRestart.Restart()
    }
}



export function* watchCheckTokenAuth() {
    yield takeLatest(checkAuth.type, checkTokenAuth)
}