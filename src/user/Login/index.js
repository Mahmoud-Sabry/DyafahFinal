import React, { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, SafeAreaView, Image, ScrollView, ImageBackground } from 'react-native'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';
import { loginUser } from '../../Redux/Slices/User/home';
import BackButton from '../../custom/BackButton';

const InputField = ({ val, OnChange, text, lang, secure }) => {
    return (
        <View style={styles.inputView}>
            <TextInput
                scrollEnabled={false}
                multiline={true}
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
    const { page } = props.route ? props.route.params ? props.route.params : null : null
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const loading = useSelector(({ home }) => home.loginLoading)
    const success = useSelector(({ home }) => home.successLogin)
    const user = useSelector(({ home }) => home.user)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    success && user && page ? navigation.navigate('UserInfo') : null

    const _onPress = () => {
        dispatch(loginUser({ phone: email, password: pass, page }))
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <ImageBackground source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}>
                    <BackButton navigation={navigation} style={{ top: 10 }} />
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
                <TouchableOpacity onPress={() => navigation.navigate('UserForget', { type: 'user' })}>
                    <Text style={styles.forgetText}>{I18n.t('providerAuth.forgetPass')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register', { page })}>
                    <Text style={styles.newRegText}>{I18n.t('providerAuth.regNew')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login
