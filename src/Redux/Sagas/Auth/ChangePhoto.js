import { Platform } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import { changePhoto, getProfile } from '../../Slices/Auth/auth';
import axios from 'axios';
import { Toast } from 'native-base';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* changeProfilePhoto({ payload }) {
    const { api_token, image } = payload
    if (image != null) {
        const fd = new FormData();
        fd.append('api_token', api_token)
        fd.append('image', {
            uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
            name: 'image.jpg',
            type: 'image/jpeg'
        }, "image.jpg")
        try {
            const response = yield call(axios.post, provider_api + 'changePhoto' + `?lang=${I18n.locale}`, fd)
            console.log("changeProfilePhoto: ", response.data)
            const { status, data, message } = response.data
            if (status != 0) {
                yield put(getProfile({ api_token }))
                yield Toast.show({ text: message, type: 'success' })
            } else {
                yield Toast.show({ text: message, buttonText: 'Okay' })
            }
        } catch ({ message }) {
            console.log("changeProfilePhoto Saga Error : ", message)
            yield Toast.show({ text: message, buttonText: 'Okay' })
        }
    }
}

export function* watchChangeProfilePhoto() {
    yield takeLatest(changePhoto.type, changeProfilePhoto)
}