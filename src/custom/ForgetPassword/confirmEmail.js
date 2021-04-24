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
import { resetEmailSuccess, sendCodeEmail } from '../../Redux/Slices/User/home';
import BackButton from '../BackButton'

const InputField = ({ val, OnChange, text, numeric }) => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditable(true);
    }, []);
    return (
        <TextInput
            editable={editable}
            keyboardType={numeric ? 'numeric' : 'default'}
            placeholder={text}
            placeholderTextColor='#ffffff'
            value={val}
            onChangeText={(text) => OnChange ? OnChange(text) : null}
            style={styles.inputField}
        />
    )
}

const ConfirmEmail = (props) => {
    const { navigate } = props.navigation
    const { type } = props.route.params
    console.log('ConfirmEmail ', type)
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const loading = useSelector(({ home }) => home.forgetLoading)
    const emailSuccess = useSelector(({ home }) => home.emailSuccess)
    const [email, setEmail] = useState('')

    const _emailConfirmed = () => {
        dispatch(resetEmailSuccess())
        type == 'user' ? navigate('UserConfirmCode', { email, type }) :
            navigate('ProviderConfirmCode', { email, type })
    }

    emailSuccess ? _emailConfirmed() : null

    const _onPress = () => {
        if (email != '') {
            dispatch(sendCodeEmail({ email, type }))
        } else {
            ShowToast(I18n.t('errors.forgetError'), 'warning')
        }
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <View style={styles.circleView}>
                    <Text style={styles.circleText}>{I18n.t('userAuth.forgetPass')}</Text>
                </View>
                <BackButton navigation={props.navigation} />
                <InputField
                    text={I18n.t('userAuth.email')}
                    val={email}
                    OnChange={setEmail}
                />
                {loading && <Spinner size='large' color='#ffffff' style={styles.regButton} />}
                {!loading && <TouchableOpacity
                    style={styles.regButton}
                    onPress={() => _onPress()}
                >
                    <Text style={styles.regText}>{I18n.t('userAuth.send')}</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => navigate('Login')}>
                    <Text style={styles.loginText}>{I18n.t('userAuth.back2Login')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConfirmEmail
