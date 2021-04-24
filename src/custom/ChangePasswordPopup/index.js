import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n'
import BorderdButton from '../BorderdButton'
import { useDispatch, useSelector } from 'react-redux'
import { changePassStatus, changeProfilePass } from '../../Redux/Slices/User/home'
import ShowToast from '../Toast'
import { Spinner } from 'native-base'

const TextInfo = ({ text, val, setVal }) => {
    return (
        <View style={styles.textInfoView}>
            <TextInput
                placeholder={text}
                placeholderTextColor='#64615E'
                value={val}
                onChangeText={(newText) => setVal(newText)}
                style={styles.textInfoStyle}
            />
        </View>
    )
}

const ChangePasswordPopup = ({ OnPress }) => {
    const dispatch = useDispatch()
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const changeStatus = useSelector(({ home }) => home.changeStatus)
    const forgetLoading = useSelector(({ home }) => home.forgetLoading)
    const [old_password, setOld_Password] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    const _closePopup = () => {
        dispatch(changePassStatus(false))
        OnPress(false)
    }

    changeStatus ? _closePopup() : null

    const _onPressChange = () => {
        if (pass2 == pass1 && pass2 != '') {
            dispatch(changeProfilePass({ api_token, old_password, password: pass1 }))
        } else alert(I18n.t('errors.passDontMatch'))
    }


    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => OnPress(false)}>
                <TextInfo
                    text={I18n.t('userAuth.oldPass')}
                    val={old_password}
                    setVal={setOld_Password}
                />
                <TextInfo
                    text={I18n.t('userAuth.newPass')}
                    val={pass1}
                    setVal={setPass1}
                />
                <TextInfo
                    text={I18n.t('userAuth.confNewPass')}
                    val={pass2}
                    setVal={setPass2}
                />
                {forgetLoading && <Spinner size='large' color='#ffffff' />}
                {!forgetLoading && <BorderdButton
                    title={I18n.t('worker.settings.changePass')}
                    ContStyle={styles.changeButton}
                    OnPress={() => _onPressChange()}
                />}
            </TouchableOpacity>
        </View>
    )
}

export default ChangePasswordPopup
