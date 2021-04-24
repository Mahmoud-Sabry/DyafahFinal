import { Platform } from 'react-native';
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { editPlace, successPlaceEdit, failPlaceEdit, changeSuccessStatus } from '../../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_api } from '../../../../assets/consts';
import I18n from '../../../../languages/I18n';

export function* editPlaceProduct({ payload }) {
    console.log("editPlaceProduct payload ", payload);
    const { api_token, product_id, ar_name, name, price, ar_description, description, details, images, days } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("product_id", product_id);
    fd.append("name", name);
    fd.append("ar_name", ar_name);
    fd.append("ar_description", ar_description);
    fd.append("description", description);
    fd.append("price", price);
    fd.append("details[]", details);
    days.forEach(day => { fd.append("days[]", day) })
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
        const response = yield call(axios.post, provider_api + 'editPlaceProduct' + `?lang=${I18n.locale}`, fd);
        console.log("editPlaceProduct Response ", response.data);
        const { status } = response.data
        status != 0 ? yield put(successPlaceEdit({ newPlace: response.data.data.product })) : yield put(failPlaceEdit({ e: response.data.message }))
        status != 0 ? yield put(changeSuccessStatus(true)) : null
    } catch (message) {
        console.log("editPlaceProduct Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("editPlaceProduct Saga Error")
        Toast.show({ text: "editPlaceProduct Saga Error", buttonText: 'Okay' })
    }
}

export function* watchEditPlaceProduct() {
    yield takeLatest(editPlace.type, editPlaceProduct)
}
