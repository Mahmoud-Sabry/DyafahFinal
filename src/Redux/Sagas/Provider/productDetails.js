import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { getProduct, setProductDetails } from '../../Slices/Provider/info';
import axios from 'axios';
import { Toast } from 'native-base';
import { dyafah, provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* getProductDetails({ payload }) {
    const { api_token, product_id } = payload
    const fd = new FormData()
    fd.append('api_token', api_token)
    fd.append('product_id', product_id)
    try {
        const { data } = yield call(axios.post, provider_api + 'productDetails' + `?lang=${I18n.locale}`, fd);
        if (data.status == 0) {
            const { message } = data
            // alert(message)
            Toast.show({ text: message })
            console.log("getProductDetails Saga Error : ", message)
            // yield put(getError({ error: message }))
        }
        else {
            const product = data.data.product
            console.log("getProductDetails Saga Data : ", product)
            let images = []
            yield product.images.forEach(image => {
                images.push({ uri: `${dyafah}${image.image}` })
            });
            yield product.images = images;
            yield put(setProductDetails({ product }))
        }
    } catch (error) {
        console.log("getProductDetails Saga Error : ", error)
        // alert(error.message)
        Toast.show({ text: error.message })
    }
}

export function* watchGetProductDetails() {
    yield takeLatest(getProduct.type, getProductDetails)
}