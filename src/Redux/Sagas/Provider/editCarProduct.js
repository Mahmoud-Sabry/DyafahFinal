import { Platform } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { editCar, doneEdit, changeSuccessStatus } from '../../Slices/Provider/info';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* editCarProduct({ payload }) {
    console.log("editCarProduct payload ", payload);
    const { api_token, name, ar_name, images, price, description, ar_description, details, car_type, car_model, car_numbers, car_license, product_id } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("name", name);
    fd.append("ar_name", ar_name);
    fd.append("details[]", details);
    fd.append("price", price);
    fd.append("description", description);
    fd.append("ar_description", ar_description);
    fd.append("car_type", car_type);
    fd.append("car_model", car_model);
    fd.append("car_numbers", car_numbers);
    fd.append("car_license", car_license);
    fd.append("product_id", product_id);
    images.forEach(image => {
        if (image != null) {
            fd.append("car_image[]", {
                uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
                name: 'car_image.jpg',
                type: 'image/jpeg'
            }, "car_image.jpg");
        }
    });
    try {
        const response = yield call(axios.post, provider_api + 'editCarProduct' + `?lang=${I18n.locale}`, fd);
        console.log("Response from api ", response.data);
        const { status } = response
        status != 0 ? yield put(doneEdit({ newCar: response.data.data.product })) : Toast.show({ text: response.data.message, type: 'danger' })
        status != 0 ? yield put(changeSuccessStatus(true)) : null
    } catch (message) {
        console.log("editCarProduct Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("editCarProduct Saga Error")
        Toast.show({ text: message, buttonText: 'Okay' })
    }
}

export function* watchEditCarProduct() {
    yield takeLatest(editCar.type, editCarProduct)
}
