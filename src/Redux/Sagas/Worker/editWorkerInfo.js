import { put, call, takeLatest } from 'redux-saga/effects';
import { editInfo, doneEditInfo } from '../../Slices/Worker/info';
// import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { Platform } from 'react-native';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';


export function* editWorkerInfo({ payload }) {
    console.log("editWorkerInfo payload ", payload, I18n.locale);
    const { api_token, images, price, ar_description, description, details, days } = payload
    const fd = new FormData();
    fd.append("api_token", api_token);
    fd.append("price", price);
    fd.append("description", description);
    fd.append("ar_description", ar_description);
    fd.append("details[]", details);
    // details.forEach(detail => );
    days.forEach(day => fd.append("days[]", day));
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
        const response = yield call(axios.post, provider_api + 'addWorkerProduct' + `?lang=${I18n.locale}`, fd);
        console.log("Response from api ", response.data);
        const { status, message } = response.data
        status != 0 ? yield put(doneEditInfo(true)) : yield put(doneEditInfo(false))
        status != 0 ? Toast.show({ text: message, type: 'success' }) : Toast.show({ text: message, type: 'danger' })
    } catch (message) {
        console.log("editWorkerInfo Saga Error : ", message)
        // yield put(getError({ error: message }))
        // alert("editWorkerInfo Saga Error")
        Toast.show({ text: "editWorkerInfo Saga Error", buttonText: 'Okay' })
    }
}

export function* watchEditWorkerInfo() {
    yield takeLatest(editInfo.type, editWorkerInfo)
}
