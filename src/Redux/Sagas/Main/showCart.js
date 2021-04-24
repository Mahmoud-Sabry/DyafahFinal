import { takeLatest, put, call } from 'redux-saga/effects';
import { getCartDetails, gotCartDetails } from '../../Slices/Main/appUser';
import axios from 'axios';
import { order_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getCartDetailsData({ payload }) {
    console.log("getCartDetailsData payload: ", payload)
    const { cart, order } = payload
    const fd = new FormData()
    cart.forEach(item => {
        fd.append('cart[]', JSON.stringify(item))
    })
    try {
        const { data } = yield call(axios.post, order_api + 'getCard' + `?lang=${I18n.locale}`, fd)
        console.log("getCartDetailsData response: ", data)
        const { status } = data
        status == 1 ? yield put(gotCartDetails({ cart: data.data, order })) :
            yield put(gotCartDetails({ cart: [], order }))
    } catch (e) {
        yield put(gotCartDetails({ cart: [], order }))
        console.log("getCartDetailsData Error: ", e)
    }
}



export function* watchGetCartDetailsData() {
    yield takeLatest(getCartDetails.type, getCartDetailsData)
}