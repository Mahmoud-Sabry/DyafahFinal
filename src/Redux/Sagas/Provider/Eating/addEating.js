import { Platform } from 'react-native';
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { addEating, successEating, failEating, changeSuccessStatus } from '../../../Slices/Provider/info';
import { Toast } from 'native-base';
import I18n from '../../../../languages/I18n';
import { provider_api } from '../../../../assets/consts'

export function* addEatingProduct({ payload }) {
    console.log("addEatingProduct payload ", payload);
    const { api_token, ar_name, name, price, ar_description, description, details, type, category_id, images } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("ar_name", ar_name);
    fd.append("name", name);
    fd.append("price", price);
    fd.append("ar_description", ar_description);
    fd.append("description", description);
    fd.append("details[]", details);
    fd.append("type", type);
    fd.append("category_id", category_id);
    images.forEach(image => {
        if (image != null) {
            fd.append("image[]", {
                uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
                name: 'image.jpg',
                type: 'image/jpeg'
            }, "image.jpg")
        }
    })
    try {
        const response = yield call(axios.post, provider_api + 'addCategoryProduct' + `?lang=${I18n.locale}`, fd);
        console.log("addEatingProduct Response ", response.data);
        const { status } = response.data
        if (status == 1) {
            yield put(successEating({ newEating: response.data.data.product }))
            yield put(changeSuccessStatus(true))
        } else { yield put(failEating({ e: response.data.message })) }
    } catch (message) {
        yield put(failEating({ e: message }))
        console.log("addEatingProduct Saga Error : ", message)
        Toast.show({ text: "addEatingProduct Saga Error" })
    }
}

export function* watchAddEatingProduct() {
    yield takeLatest(addEating.type, addEatingProduct)
}
