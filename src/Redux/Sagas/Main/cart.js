import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { getAsyncCart, setAsyncCart, setUserCart } from '../../Slices/Main/appUser';
import AsyncStorage from '@react-native-community/async-storage';
import ShowToast from '../../../custom/Toast';

async function AsyncSet(cart) {
    const jsonValue = JSON.stringify(cart)
    await AsyncStorage.setItem('Cart', jsonValue)
}

export function* setCartToStorage({ payload }) {
    try {
        yield call(AsyncSet, payload)
    } catch ({ message }) {
        ShowToast(message)
        console.log("Set Async Cart Saga Error : ", message)
    }
}

export function* watchSetCartToStorage() {
    yield takeEvery(setAsyncCart.type, setCartToStorage)
}

export function* getCartFromStorage() {
    try {
        const jsonValue = yield AsyncStorage.getItem('Cart')
        if (jsonValue !== null) {
            const cart = jsonValue != null ? JSON.parse(jsonValue) : []
            yield put(setUserCart(cart))
        }
        else {
            yield put(setUserCart([]))
            yield put(setAsyncCart([]))
        }
    } catch (error) {
        console.log("getCartFromStorage Error : ", error)
        yield put(setUserCart([]))
        ShowToast(error.message)
    }
}

export function* watchGetCartFromStorage() {
    yield takeLatest(getAsyncCart.type, getCartFromStorage)
}