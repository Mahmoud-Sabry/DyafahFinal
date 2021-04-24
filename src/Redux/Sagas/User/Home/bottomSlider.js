import { takeLatest, put, call } from 'redux-saga/effects';
import { getBottomSlider, setBottomSlider } from '../../../Slices/User/home';
import axios from 'axios';
import { home_api } from '../../../../assets/consts';
import ShowToast from '../../../../custom/Toast';
import I18n from '../../../../languages/I18n';

export function* getBottomSliderData({ payload }) {
    // console.log("getBottomSliderData: ", payload)
    // const { } = payload
    try {
        const { data } = yield call(axios.post, home_api + 'slider-bottom' + `?lang=${I18n.locale}`, null)
        console.log("getBottomSlider response: ", data)
        const { status, message } = data
        status == 1 ? yield put(setBottomSlider({ sliders: data.data.sliders })) : ShowToast(message, 'danger')
    } catch (e) {
        console.log("getBottomSliderData Error: ", e)
    }
}



export function* watchGetBottomSliderData() {
    yield takeLatest(getBottomSlider.type, getBottomSliderData)
}