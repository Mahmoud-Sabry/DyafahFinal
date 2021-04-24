import React, { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, SafeAreaView, Image, ScrollView, ImageBackground } from 'react-native'
import styles from './styles'
import { startLogin, resetLogin } from '../../Redux/Slices/Auth/login';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';
import BackButton from '../../custom/BackButton';

const InputField = ({ val, OnChange, text, lang, secure }) => {
    return (
        <View style={styles.inputView}>
            <TextInput
                secureTextEntry={secure}
                placeholder={text}
                placeholderTextColor='#ffffff'
                value={val}
                onChangeText={(text) => OnChange ? OnChange(text) : null}
                style={styles.inputField}
            />
        </View>
    )
}

const Login = (props) => {
    const { navigation } = props
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const loading = useSelector(({ login }) => login.loading)
    const success = useSelector(({ login }) => login.success)
    const user = useSelector(({ login }) => login.user)
    const fail = useSelector(({ login }) => login.fail)
    const error = useSelector(({ login }) => login.error)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    if (success) {
        const { type } = user
        console.log("USER in LOGIN ", user)
        if (type == 'coffee' || type == 'chef') {
            navigation.push('WorkerDrawer', { user: user })
            dispatch(resetLogin())
        } else {
            navigation.push('ProviderDrawer', { user: user })
            dispatch(resetLogin())
        }
    }

    const _onForgetPress = () => {
        navigation.push('ProviderForget', { type: 'provider' })
    }

    const _onPress = () => {
        dispatch(startLogin({ phone: email, password: pass }))
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <ImageBackground source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}>
                    <BackButton navigation={navigation} style={styles.backButton} />
                </ImageBackground>
                {/* <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}
                /> */}
                <InputField
                    lang={lang}
                    text={I18n.t('providerAuth.loginEmail')}
                    val={email}
                    OnChange={setEmail}
                />
                <InputField
                    secure={true}
                    lang={lang}
                    text={I18n.t('providerAuth.password')}
                    val={pass}
                    OnChange={setPass}
                />
                {loading && <Spinner size='large' color='#ffffff' style={styles.regButton} />}
                {!loading && <TouchableOpacity
                    style={styles.regButton}
                    onPress={() => _onPress()}
                >
                    <Text style={styles.regText}>{I18n.t('providerAuth.login')}</Text>
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => _onForgetPress()}>
                    <Text style={styles.forgetText}>{I18n.t('providerAuth.forgetPass')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Text style={styles.newRegText}>{I18n.t('providerAuth.regNew')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login
