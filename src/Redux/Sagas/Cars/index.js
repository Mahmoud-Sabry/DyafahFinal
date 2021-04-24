import { take, put, call, apply, takeLatest, fork, delay } from 'redux-saga/effects';
import { getCars, getError, setCars } from '../../Slices/Cars';
import axios from 'axios';
import { Toast } from 'native-base';

export function* getCarsList() {
    try {
        // const { data } = yield call(axios.get, 'https://api.alquran.cloud/v1/quran/ar.muyassar');
        const carsList = [
            { id: 1, uri: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', type: 'product' },
            { id: 2, uri: 'https://images.pexels.com/photos/38637/car-audi-auto-automotive-38637.jpeg', type: 'product' },
            { id: 3, uri: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg', type: 'product' },
            { id: 5, uri: 'https://images.pexels.com/photos/1149056/pexels-photo-1149056.jpeg', type: 'product' },
            { id: 6, uri: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg', type: 'product' },
            { id: 4, uri: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg', type: 'product' },
        ]
        yield put(setCars({ data: carsList }));
    } catch ({ message }) {
        // alert("Cars Saga Error : ", message)
        Toast.show({ text: message })
        yield put(getError({ error: message }))
    }
}

export function* watchGetCarsList() {
    yield takeLatest(getCars.type, getCarsList);
}