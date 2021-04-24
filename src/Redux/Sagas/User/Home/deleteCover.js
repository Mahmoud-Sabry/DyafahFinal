import { put, call, takeLatest } from 'redux-saga/effects';
import { deleteCover, coverChanged } from '../../../Slices/User/home';
import axios from 'axios';
import { user_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n'

export function* deleteUserCover({ payload }) {
    const { api_token, type_image, role } = payload
    if (api_token != null) {
        const fd = new FormData();
        fd.append('api_token', api_token)
        fd.append('type_image', type_image)
        fd.append('role', role)
        try {
            const response = yield call(axios.post, `${user_api}` + 'removeCoverImage' + `?lang=${I18n.locale}`, fd)
            console.log("deleteUserCover: ", response.data)
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
            console.log("deleteUserCover Saga Error : ", message)
        }
    } else {
        yield ShowToast(I18n.t('errors.notAuth'), 'danger')
    }
}

export function* watchDeleteUserCover() {
    yield takeLatest(deleteCover.type, deleteUserCover)
}