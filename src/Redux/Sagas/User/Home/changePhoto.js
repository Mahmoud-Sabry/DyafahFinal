import { Platform } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import { photoChanged, changeUserPhoto } from '../../../Slices/User/home';
import axios from 'axios';
import { user_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n'
import { getProfile } from '../../../Slices/Main/appUser';

export function* changeUserProfilePhoto({ payload }) {
    const { api_token, image } = payload
    if (image != null && api_token != null) {
        const fd = new FormData();
        fd.append('api_token', api_token)
        fd.append('image', {
            uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
            name: 'image.jpg',
            type: 'image/jpeg'
        }, "image.jpg")
        try {
            const response = yield call(axios.post, `${user_api}` + 'changePhoto' + `?lang=${I18n.locale}`, fd)
            console.log("changeUserPhoto: ", response.data)
            const { status, data, message } = response.data
            if (status != 0) {
                yield put(photoChanged({}))
                // yield put(getProfile({ api_token }))
                yield ShowToast(message, 'success')
            } else {
                yield put(photoChanged({ e: message })) //Toast.show({ text: message, buttonText: 'Okay' })
            }
        } catch ({ message }) {
            console.log("changeUserPhoto Saga Error : ", message)
            yield ShowToast(message, 'danger')
        }
    } else {
        yield ShowToast(I18n.t('errors.notAuth'), 'danger')
    }
}

export function* watchChangeUserPhoto() {
    yield takeLatest(changeUserPhoto.type, changeUserProfilePhoto)
}