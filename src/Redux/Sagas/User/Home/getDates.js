import { takeLatest, put, call } from 'redux-saga/effects';
import { getDates, setDates } from '../../../Slices/User/home';
import axios from 'axios';
import { product_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getDatesData({ payload }) {
    const { id } = payload
    const fd = new FormData();
    fd.append('product_id', id)
    try {
        const { data } = yield call(axios.post, product_api + 'availableDates' + `?lang=${I18n.locale}`, fd)
        console.log("getDatesData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setDates({ dates: data.data.productDates })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getDatesData Error: ", e)
    }
}



export function* watchGetDatesData() {
    yield takeLatest(getDates.type, getDatesData)
}