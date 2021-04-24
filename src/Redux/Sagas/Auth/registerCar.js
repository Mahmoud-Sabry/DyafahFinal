import { Platform } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import { getError, regCarProvider, setCarProvider } from '../../Slices/Auth/registerCar';
import axios from 'axios';
import { Toast } from 'native-base';
import { startLogin } from '../../Slices/Auth/login';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* registerCarProvider({ payload }) {
    const { image, name, ar_name, email, phone, password, carType, carModel, description, ar_description, plateNo, license, price } = payload
    const fd = new FormData();
    fd.append('username', name)
    fd.append('ar_username', ar_name)
    fd.append('email', email)
    fd.append('phone', phone)
    fd.append('password', password)
    fd.append('car_type', carType)
    fd.append('car_model', carModel)
    fd.append('description', description)
    fd.append('ar_description', ar_description)
    fd.append('car_numbers', plateNo)
    fd.append('car_license', license)
    fd.append('price', price)
    fd.append('car_image', {
        uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
        name: 'car_image.jpg',
        type: 'image/jpeg'
    }, "car_image.jpg")
    try {
        const response = yield call(axios.post, provider_api + 'registerCarProvider' + `?lang=${I18n.locale}`, fd)
        const { status, data, message } = response.data
        if (status != 0) {
            yield put(setCarProvider({ data: data }))
            yield put(startLogin({ phone, password }))
        } else yield put(getError({ error: message }))
    } catch ({ message }) {
        console.log("Cars Saga Error : ", message)
        yield put(getError({ error: message }))
        // alert("Cars Saga Error")
        Toast.show({ text: message })
    }
}

export function* watchRegisterCarProvider() {
    yield takeLatest(regCarProvider.type, registerCarProvider)
}
