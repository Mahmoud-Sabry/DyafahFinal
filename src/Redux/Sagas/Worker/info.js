import { takeLatest, fork, put } from 'redux-saga/effects';
import { setAppUser, setAppUserAsync } from '../../Slices/Main/appUser';
import {
    setUser,
    getHome, getRates, getWorker,
    getNewOrders, getWaitingOrders, getCompletedOrders,
} from '../../Slices/Worker/info';
import {
    getWorkerHome, getWorkerRates, getWorkerinfo,
    getWorkerNewOrders,
    getWorkerCompletedOrders, getWorkerWaitingOrders
} from './helpers';

export function* setWorkerInfo({ payload }) {
    const { user } = payload
    const { api_token, } = user
    yield put(setAppUser({ user }))
    yield put(setAppUserAsync({ user }))
    yield put(getHome({ token: api_token }))
    yield put(getRates({ token: api_token }))
    yield put(getWorker({ token: api_token }))
}

export function* watchGetWorkerHome() {
    yield takeLatest(getHome.type, getWorkerHome)
}

export function* watchGetWorkerRates() {
    yield takeLatest(getRates.type, getWorkerRates)
}

export function* watchGetWorkerInfo() {
    yield takeLatest(getWorker.type, getWorkerinfo)
}

export function* watchGetWorkerNewOrders() {
    yield takeLatest(getNewOrders.type, getWorkerNewOrders)
}
export function* watchGetWorkerWaitingOrders() {
    yield takeLatest(getWaitingOrders.type, getWorkerWaitingOrders)
}

export function* watchGetWorkerCompletedOrders() {
    yield takeLatest(getCompletedOrders.type, getWorkerCompletedOrders)
}

export function* watchSetWorkerUser() {
    yield takeLatest(setUser.type, setWorkerInfo)
}