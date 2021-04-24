import { takeLatest, put, call } from 'redux-saga/effects';
import { getChefWorkers, setChefWorkers, getCoffeeWorkers, setCoffeeWorkers } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getChefWorkersData({ payload }) {
    const { api_token, page } = payload
    const nextPage = page ? page : 1
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('type', 'chef')
    try {
        const { data } = yield call(axios.post, home_api + 'chefCoffeWorkers' + `?page=${nextPage}` + `&?lang=${I18n.locale}`, fd)
        console.log("getChefWorkersData response: ", data)
        const { status, message } = data
        if (status == 1) {
            const workers = data.data.workers.data
            const c_page = data.data.workers.current_page
            const next = data.data.workers.next_page_url != null
            yield put(setChefWorkers({ workers, page: c_page, next }))
        } else {
            yield put(setChefWorkers({ workers: [], page: 0, next: false }))
        }
    } catch (e) {
        yield put(setChefWorkers({ workers: [], page: 0, next: false }))
        console.log("getChefWorkersData Error: ", e)
    }
}

export function* getCoffeeWorkesData({ payload }) {
    const { api_token, page } = payload
    const nextPage = page ? page : 1
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('type', 'coffee')
    try {
        const { data } = yield call(axios.post, home_api + 'chefCoffeWorkers' + `?page=${nextPage}` + `&?lang=${I18n.locale}`, fd)
        console.log("getCoffeeWorkesData response: ", data)
        const { status, message } = data
        if (status == 1) {
            const workers = data.data.workers.data
            const c_page = data.data.workers.current_page
            const next = data.data.workers.next_page_url != null
            yield put(setCoffeeWorkers({ workers, page: c_page, next }))
        } else {
            yield put(setCoffeeWorkers({ workers: [], page: 0, next: false }))
        }
    } catch (e) {
        yield put(setCoffeeWorkers({ workers: [], page: 0, next: false }))
        console.log("getCoffeeWorkesData Error: ", e)
    }
}

export function* watchGetChefWorkersData() {
    yield takeLatest(getChefWorkers.type, getChefWorkersData)
}


export function* watchGetCoffeeWorkesData() {
    yield takeLatest(getCoffeeWorkers.type, getCoffeeWorkesData)
}