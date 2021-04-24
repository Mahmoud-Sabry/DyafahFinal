import { takeLatest, put, call } from 'redux-saga/effects';
import { addProductComment, productCommented } from '../../Slices/Main/appUser';
import axios from 'axios';
import { product_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* productCommenting({ payload }) {
    const { api_token, id, comment, role } = payload
    console.log('productCommenting payload: ', payload)
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('product_id', id)
    fd.append('comment', comment)
    fd.append('type', role)
    try {
        const { data } = yield call(axios.post, product_api + 'comment' + `?lang=${I18n.locale}`, fd)
        console.log("productCommenting response: ", data)
        const { status, message } = data
        status == 1 ? yield put(productCommented()) : yield put(productCommented())
        status == 1 ? null : ShowToast(message, 'danger')
    } catch (e) {
        console.log("productCommenting Error: ", e)
        yield put(productCommented())
    }
}

export function* watchProductCommenting() {
    yield takeLatest(addProductComment.type, productCommenting)
}