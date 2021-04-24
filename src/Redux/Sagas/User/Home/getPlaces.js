import { takeLatest, put, call } from 'redux-saga/effects';
import { getPlaces, setPlaces } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getPlacesData({ payload }) {
    const { api_token, page } = payload
    const nextPage = page ? page : 1
    const fd = new FormData()
    fd.append('api_token', api_token)
    try {
        const { data } = yield call(axios.post, home_api + 'placesProducts' + `?page=${nextPage}` + `&?lang=${I18n.locale}`, fd)
        console.log("getPlacesData response: ", data)
        const { status, message } = data
        if (status == 1) {
            const places = data.data.products.data
            const c_page = data.data.products.current_page
            const next = data.data.products.next_page_url != null
            yield put(setPlaces({ places, page: c_page, next }))
        } else {
            yield put(setPlaces({ places: [], page: 0, next: false }))
        }
    } catch (e) {
        yield put(setPlaces({ places: [], page: 0, next: false }))
        console.log("getPlacesData Error: ", e)
    }
}



export function* watchGetPlacesData() {
    yield takeLatest(getPlaces.type, getPlacesData)
}