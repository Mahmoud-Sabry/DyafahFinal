import { takeLatest, put, call } from 'redux-saga/effects';
import { getTopSlider, setTopSlider } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getTopSliderData({ payload }) {
    // console.log("getBottomSliderData: ", payload)
    // const { } = payload
    try {
        const { data } = yield call(axios.post, home_api + 'slider-top' + `?lang=${I18n.locale}`, null)
        console.log("getTopSliderData response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setTopSlider({ sliders: data.data.sliders })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getTopSliderData Error: ", e)
    }
}



export function* watchGetTopSliderData() {
    yield takeLatest(getTopSlider.type, getTopSliderData)
}