import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles';
import { Toast, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../Redux/Slices/Auth/auth';
import I18n from '../../languages/I18n';

const PassSec = ({ user }) => {
    const [old_password, setOld_Password] = useState('')
    const [pass, setPass] = useState('')
    const [conPass, setConPass] = useState('')
    const changePassLoading = useSelector(({ auth }) => auth.changePassLoading)
    const language = useSelector(({ language }) => language.language)
    const dispatch = useDispatch()

    const onChangePress = () => {
        const { api_token } = user
        if (pass == conPass && pass != '') {
            dispatch(changePassword({ api_token, old_password, password: pass }))
        } else {
            Toast.show({ text: I18n.t('errors.passDontMatch'), type: 'warning', textStyle: { textAlign: 'center' } })
        }
    }

    return (
        <View style={styles.secView}>
            <TextInput
                secureTextEntry
                placeholder={I18n.t('userAuth.oldPass')}
                style={styles.passInput}
                value={old_password}
                onChangeText={(newVal) => setOld_Password(newVal)}
            />
            <TextInput
                secureTextEntry
                placeholder={I18n.t('worker.settings.pass')}
                style={styles.passInput}
                value={pass}
                onChangeText={(newVal) => setPass(newVal)}
            />
            <TextInput
                secureTextEntry
                placeholder={I18n.t('worker.settings.confPass')}
                style={styles.passInput}
                value={conPass}
                onChangeText={(newVal) => setConPass(newVal)}
            />
            {!changePassLoading && <TouchableOpacity style={styles.editButton} onPress={() => onChangePress()}>
                <Text style={styles.editButtonText}>{I18n.t('worker.settings.change')}</Text>
            </TouchableOpacity>}
            {changePassLoading && <Spinner size='large' color='#F47421' />}
        </View>
    )
}

export default PassSec
