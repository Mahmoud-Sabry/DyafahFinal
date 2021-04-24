import { take, put, call, apply, takeLatest, fork, delay } from 'redux-saga/effects';
import { regProvider, setProvider, getError } from '../../Slices/Auth/registerProvider';
import axios from 'axios';
import { Toast } from 'native-base';
import { startLogin } from '../../Slices/Auth/login';
import { provider_api } from '../../../assets/consts';
import I18n from '../../../languages/I18n';

export function* registerProvider({ payload }) {
    // const { payload } = yield take(regProvider.type)
    const { name, ar_name, email, phone, birth, id, exp, password, type } = payload
    console.log("Payload : ", payload)
    try {
        const { data } = yield call(
            axios.post,
            provider_api + 'registerProvider' + `?lang=${I18n.locale}`,
            {
                username: name,
                ar_username: ar_name,
                email,
                phone,
                password,
                type_provider: type,
                national_id: id,
                birth_date: birth,
                experience: exp
            }
        );
        console.log("Data from registerProvider : ", data)
        if (data.status != 0) {
            yield put(startLogin({ phone, password }))
            yield put(setProvider({ data: data }))
            // Toast.show({ text: "Done", buttonText: 'Okay', type: "success" })
            // alert("Done!")
        } else {
            yield put(getError({ error: data.message }))
            // alert(data.message)
            Toast.show({ text: data.message })
        }
    } catch ({ message }) {
        console.log("regProvider Saga Error : ", message)
        // alert(message)
        Toast.show({ text: message })
        yield put(getError({ error: message }))
    }
}

export function* watchRegisterProvider() {
    yield takeLatest(regProvider.type, registerProvider);
}