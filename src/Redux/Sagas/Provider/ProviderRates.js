import { put, call, takeLatest } from 'redux-saga/effects';
import { getProviderRates, setProviderRates } from '../../Slices/Provider/info';
import axios from 'axios';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* gettingProviderRates({ payload }) {
    const { api_token } = payload
    var formdata = new FormData()
    formdata.append("api_token", api_token)
    try {
        const { data } = yield call(axios.post, provider_api + 'providerRates' + `?lang=${I18n.locale}`, formdata);
        if (data.status == 0) {
            const { message } = data
            console.log("gettingProviderRates Saga Error : ", message)
            Toast.show({ text: message, type: 'danger' })
            yield put(setProviderRates([]))
        }
        else {
            const rates = data.data
            console.log("gettingProviderRates Saga Data : ", rates)
            yield put(setProviderRates(rates))
        }

    } catch ({ message }) {
        yield put(setProviderRates([]))
        console.log("gettingProviderRates Saga Error : ", message)
        Toast.show({ text: message, type: 'danger' })
    }
}

export function* watchGetProviderRates() {
    yield takeLatest(getProviderRates.type, gettingProviderRates)
}