import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { setProvider, getNewOrders, getPreparingOrders, getFinishedOrders, getOffers, getProducts } from '../../Slices/Provider/info';
import {
    getProviderNewOrders, getProviderPreparingOrders, getProviderFinishedOrders,
    getProviderOffers, getProviderProducts,
    getEatingCategories, getKashtaCategories
} from './helpers';
import { setAppUser, setAppUserAsync } from '../../Slices/Main/appUser';

export function* setProviderInfo({ payload }) {
    const { provider } = payload
    const { api_token, type } = provider
    console.log("setProviderInfo Saga!", provider)
    yield put(setAppUser({ user: provider }))
    yield put(setAppUserAsync({ user: provider }))
    yield put(getNewOrders({ token: api_token }))
    yield put(getPreparingOrders({ token: api_token }))
    yield put(getFinishedOrders({ token: api_token }))
    yield put(getProducts({ token: api_token }))
    yield put(getOffers({ token: api_token }))
    if (type == 'popular_eating' || type == 'kashta') {
        yield fork(getEatingCategories, api_token)
        yield fork(getKashtaCategories, api_token)
    }
}

export function* watchGetNewOrders() {
    yield takeLatest(getNewOrders.type, getProviderNewOrders)
}

export function* watchGetPreparingOrders() {
    yield takeLatest(getPreparingOrders.type, getProviderPreparingOrders)
}

export function* watchGetFinishedOrders() {
    yield takeLatest(getFinishedOrders.type, getProviderFinishedOrders)
}

export function* watchGetOffers() {
    yield takeLatest(getOffers.type, getProviderOffers)
}

export function* watchGetNewProducts() {
    yield takeLatest(getProducts.type, getProviderProducts)
}

export function* watchSetProviderInfo() {
    yield takeLatest(setProvider.type, setProviderInfo)
}