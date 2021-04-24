import { take, put, call, apply, takeLatest, fork, delay, takeEvery } from 'redux-saga/effects';
import { getCars, getError, setCars } from '../../Slices/Cars';
import axios from 'axios';

export function* loadCarDetails(item) {
    // const { item } = yield take("LOAD_CAR_DETAILS")
    console.info("DATA Item : ", item);
}

export function* setCarsDetails() {
    const { payload } = yield take(setCars.type)
    let arr = payload.data
    const aaa = yield arr.map(item => fork(loadCarDetails, item))
    console.log("DATA : ", aaa)
}