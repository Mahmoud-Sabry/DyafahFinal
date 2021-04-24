import { Platform } from 'react-native';
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { editEating, successEating, failEating, changeSuccessStatus } from '../../../Slices/Provider/info';
import { Toast } from 'native-base';
import I18n from '../../../../languages/I18n';

export function* editEatingProduct({ payload }) {
    console.log("editEatingProduct payload ", payload);
    const { api_token, product_id, ar_name, name, price, ar_description, description, details, type, category_id, images } = payload
    const url = 'https://dyafa.dtagdev.com/api/provider/editCategoryProduct';
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("product_id", product_id);
    fd.append("ar_name", ar_name);
    fd.append("name", name);
    fd.append("price", price);
    fd.append("description", description);
    fd.append("ar_description", ar_description);
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
        const response = yield call(axios.post, url + `?lang=${I18n.locale}`, fd);
        console.log("editEatingProduct Response ", response.data);
        const { status } = response.data
        if (status == 1) {
            yield put(successEating({ newEating: response.data.data.product }))
            yield put(changeSuccessStatus(true))
        }
        else yield put(failEating({ e: response.data.message }))
    } catch (message) {
        console.log("editEatingProduct Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("editEatingProduct Saga Error")
        Toast.show({ text: "editEatingProduct Saga Error", buttonText: 'Okay' })
    }
}

export function* watchEditEatingProduct() {
    yield takeLatest(editEating.type, editEatingProduct)
}