import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { getSettings, setTermsCondition, setPrivacy, setAboutUS } from '../../Slices/Main/appUser';
import axios from 'axios';
import { settings_api } from '../../../assets/consts';
import ShowToast from '../../../custom/Toast';
import I18n from '../../../languages/I18n';

export function* getTermsCondition() {
    try {
        const { data } = yield call(axios.post, settings_api + 'termsCondition' + `?lang=${I18n.locale}`, null)
        const { status, message } = data
        status == 1 ? yield put(setTermsCondition({ setting: data.data.terms })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getTermsCondition Error: ", e)
    }
}

export function* getPrivacy() {
    try {
        const { data } = yield call(axios.post, settings_api + 'privacy' + `?lang=${I18n.locale}`, null)
        const { status, message } = data
        status == 1 ? yield put(setPrivacy({ setting: data.data.privacy })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getPrivacy Error: ", e)
    }
}

export function* getAboutUs() {
    try {
        const { data } = yield call(axios.post, settings_api + 'aboutUs' + `?lang=${I18n.locale}`, null)
        const { status, message } = data
        status == 1 ? yield put(setAboutUS({ setting: data.data.about })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getAboutUs Error: ", e)
    }
}

export function* getSettingsData() {
    console.log("getSettingsData called")
    try {
        yield fork(getTermsCondition, '')
        yield fork(getPrivacy, '')
        yield fork(getAboutUs, '')
    } catch (e) {
        console.log("getSettingsData Error: ", e)
    }
}

export function* watchGetSettingsData() {
    yield takeLatest(getSettings.type, getSettingsData)
}