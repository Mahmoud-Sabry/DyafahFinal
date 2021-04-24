import { put, call, takeLatest } from 'redux-saga/effects'
import { changeWorkerStatus, workerStatusChanged } from '../../Slices/Worker/info'
import axios from 'axios'
import ShowToast from '../../../custom/Toast'
import { provider_api } from '../../../assets/consts'
import I18n from '../../../languages/I18n'

export function* changeWorkerHomeStatus({ payload }) {
    const { api_token, status } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('status', status)
    try {
        const { data } = yield call(axios.post, provider_api + 'changeStatus' + `?lang=${I18n.locale}`, fd);
        console.log("Data from changeWorkerHomeStatus : ", data)
        if (data.status != 0) {
            yield put(workerStatusChanged())
        } else {
            yield put(workerStatusChanged())
            ShowToast(data.message, 'danger')
        }
    } catch ({ message }) {
        console.log("changeWorkerHomeStatus Saga Error : ", message)
        yield put(workerStatusChanged())
        ShowToast(message, 'danger')
    }
}

export function* watchChangeWorkerHomeStatus() {
    yield takeLatest(changeWorkerStatus.type, changeWorkerHomeStatus)
}