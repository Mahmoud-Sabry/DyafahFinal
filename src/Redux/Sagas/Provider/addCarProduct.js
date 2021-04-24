import { put, call, takeLatest } from 'redux-saga/effects';
import { addCar, changeSuccessStatus, doneEdit, failEditCar } from '../../Slices/Provider/info';
import axios from 'axios';
import { Platform } from 'react-native';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* addCarProduct({ payload }) {
    console.log("addCarProduct payload ", payload);
    const { api_token, name, ar_name, images, price, description, ar_description, details, car_type, car_model, car_numbers, car_license } = payload
    const formdata = new FormData();
    formdata.append("api_token", api_token);
    formdata.append("name", name);
    formdata.append("ar_name", ar_name);
    formdata.append("details[]", details);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("ar_description", ar_description);
    formdata.append("car_type", car_type);
    formdata.append("car_model", car_model);
    formdata.append("car_numbers", car_numbers);
    formdata.append("car_license", car_license);
    images.forEach(image => {
        if (image != null) {
            formdata.append("car_image[]", {
                uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
                name: 'car_image.jpg',
                type: 'image/jpeg'
            }, "car_image.jpg")
        }
    })
    try {
        const response = yield call(axios.post, provider_api + 'addCarProduct' + `?lang=${I18n.locale}`, formdata);
        console.log("Response from api ", response.data);
        const { status, message, data } = response.data
        status != 0 ? yield put(doneEdit({ e: message, newCar: data.product })) : yield put(failEditCar({ e: message }))
        status != 0 ? yield put(changeSuccessStatus(true)) : null
    } catch (message) {
        console.log("addCarProduct Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("addCarProduct Saga Error")
        // Toast.show({ text: "addCarProduct Saga Error" })
    }
}

export function* watchAddCarProduct() {
    yield takeLatest(addCar.type, addCarProduct)
}
