import { Platform } from 'react-native';
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { addPlace, successPlaceEdit, failPlaceEdit, changeSuccessStatus } from '../../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_api } from '../../../../assets/consts';
import I18n from '../../../../languages/I18n';

export function* addPlaceProduct({ payload }) {
    console.log("addPlaceProduct payload ", payload);
    const { api_token, images, price, ar_description, description, details, name, ar_name, days } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
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
            }, "image.jpg");
        }
    });
    try {
        const response = yield call(axios.post, provider_api + 'addPlaceProduct' + `?lang=${I18n.locale}`, fd);
        console.log("addPlaceProduct Response ", response.data);
        const { status } = response.data
        if (status == 1) {
            yield put(successPlaceEdit({ newPlace: response.data.data.product }))
            yield put(changeSuccessStatus(true))
        }
        else yield put(failPlaceEdit({ e: response.data.message }))
    } catch (message) {
        console.log("addPlaceProduct Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("addPlaceProduct Saga Error")
        Toast.show({ text: "addPlaceProduct Saga Error" })
    }
}

export function* watchAddPlaceProduct() {
    yield takeLatest(addPlace.type, addPlaceProduct)
}
