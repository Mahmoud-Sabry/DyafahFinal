import React, { useEffect, useState } from 'react'
import {
    View, Text, SafeAreaView,
    ScrollView, TextInput, TouchableOpacity
} from 'react-native'
import { Spinner } from 'native-base';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n'
import ShowToast from '../Toast';
import { confirmCode, codeConfirmed } from '../../Redux/Slices/User/home';
import BackButton from '../BackButton';

const InputField = ({ val, OnChange, text }) => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditable(true);
    }, []);
    return (
        <TextInput
            keyboardType='number-pad'
            editable={editable}
            placeholder={text}
            placeholderTextColor='#ffffff'
            value={val}
            onChangeText={(text) => OnChange ? OnChange(text) : null}
            style={styles.inputField}
        />
    )
}

const ConfirmCode = (props) => {
    const { email, type } = props.route.params
    const { navigate } = props.navigation
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const loading = useSelector(({ home }) => home.forgetLoading)
    const codeSuccess = useSelector(({ home }) => home.codeSuccess)
    const [code, setCode] = useState('')

    const _emailConfirmed = () => {
        dispatch(codeConfirmed({ confirmed: false }))
        type == 'user' ? navigate('UserChangePass', { type }) :
            navigate('ProviderChangePassword', { type })
    }
    console.log('codeSuccess: ', codeSuccess)
    codeSuccess ? _emailConfirmed() : null

    const _onPress = () => {
        if (email != '' && code != '') {
            dispatch(confirmCode({ email, code, type }))
        } else {
            ShowToast(I18n.t('errors.forgetCode'), 'warning')
        }
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <View style={styles.circleView}>
                    <Text style={styles.circleText}>{I18n.t('userAuth.forgetPass')}</Text>
                </View>
                <BackButton navigation={props.navigation} />
                <View style={{top: -80}}>
                    <Text style={styles.codeLabel}>{I18n.t('userAuth.codeLabel')}</Text>
                    <InputField
                        text={I18n.t('userAuth.code')}
                        val={code}
                        OnChange={setCode}
                    />
                    {loading && <Spinner size='large' color='#ffffff' style={styles.regButton} />}
                    {!loading && <TouchableOpacity
                        style={styles.regButton}
                        onPress={() => _onPress()}
                    >
                        <Text style={styles.regText}>{I18n.t('userAuth.confirm')}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity >
                        <Text style={styles.loginText}>{I18n.t('userAuth.sendAgain')}</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={() => navigate('Login')}>
                    <Text style={styles.loginText}>{I18n.t('userAuth.back2Login')}</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmCode
