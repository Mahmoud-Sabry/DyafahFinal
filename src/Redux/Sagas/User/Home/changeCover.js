import { Platform } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import { changeCover, coverChanged } from '../../../Slices/User/home';
import axios from 'axios';
import { user_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n'
import { getProfile } from '../../../Slices/Main/appUser';

export function* changeUserCover({ payload }) {
    const { api_token, image } = payload
    if (image != null && api_token != null) {
        const fd = new FormData();
        fd.append('api_token', api_token)
        fd.append('cover', {
            uri: Platform.OS == "android" ? image.uri : image.uri.replace("file://", ""),
            name: 'image.jpg',
            type: 'image/jpeg'
        }, "image.jpg")
        try {
            const response = yield call(axios.post, `${user_api}` + 'changeCover' + `?lang=${I18n.locale}`, fd)
            console.log("changeUserCover: ", response.data)
            const { status, data, message } = response.data
            if (status != 0) {
                yield put(coverChanged({}))
                // yield put(getProfile({ api_token }))
                yield ShowToast(message, 'success')
            } else {
                yield put(coverChanged({ e: message }))
            }
        } catch ({ message }) {
            yield put(coverChanged({ e: message }))
            yield ShowToast(message, 'danger')
            console.log("changeUserCover Saga Error : ", message)
        }
    } else {
        yield ShowToast(I18n.t('errors.notAuth'), 'danger')
    }
}

export function* watchChangeUserCover() {
    yield takeLatest(changeCover.type, changeUserCover)
}