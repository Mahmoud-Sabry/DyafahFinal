import { put, call, takeLatest } from 'redux-saga/effects';
import { getLang, setLang, getLangAsnc } from '../../Slices/Main/language';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

async function AsyncSet(Lang) {
    await AsyncStorage.setItem('Language', Lang)
}

export function* setLanguage({ payload }) {
    try {
        yield call(AsyncSet, payload)

    } catch ({ message }) {
        console.log("Set Lang Saga Error : ", message)
    }
}

export function* watchSetLanguage() {
    yield takeLatest(setLang.type, setLanguage)
}

export function* AsyncGet() {
    try {
        const value = yield AsyncStorage.getItem('Language')
        if (value !== null) {
            yield put(getLangAsnc({ Lang: value }))
        }
        else {
            yield put(getLangAsnc({ Lang: 'ar' }))
        }
    } catch (error) {
        // alert("AsyncGet fn Error : ", error)
        Toast.show({ text: error })
        console.log("AsyncGet fn Error : ", error)
    }
}

export function* getLanguage() {
    yield takeLatest(getLang.type, AsyncGet)
}