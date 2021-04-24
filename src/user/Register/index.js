import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Icon, Spinner } from 'native-base';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/Slices/User/home';
import I18n from '../../languages/I18n';
import BackButton from '../../custom/BackButton';
import PhoneCode from '../../custom/PhoneCode';

const NameFields = ({ val1, val2, OnChange1, OnChange2 }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    return (
        <View style={[styles.inputView, langView]}>
            <TextInput
                multiline={true}
                placeholder={I18n.t('userAuth.firstName')}
                placeholderTextColor='#ffffff'
                value={val1}
                onChangeText={(text) => OnChange1 ? OnChange1(text) : null}
                style={styles.nameField}
            />
            <TextInput
                multiline={true}
                placeholder={I18n.t('userAuth.secondName')}
                placeholderTextColor='#ffffff'
                value={val2}
                onChangeText={(text) => OnChange2 ? OnChange2(text) : null}
                style={styles.nameField}
            />
        </View>
    )
}

const InputField = ({ val, OnChange, text, numeric }) => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditable(true);
    }, []);
    return (
        <View>
            <TextInput
                multiline={true}
                editable={editable}
                keyboardType={numeric ? 'numeric' : 'default'}
                placeholder={text}
                placeholderTextColor='#ffffff'
                value={val}
                onChangeText={(text) => OnChange ? OnChange(text) : null}
                style={styles.inputField}
            />
        </View>
    )
}

const PhoneField = ({ val, OnChange, text }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    return (
        <View style={[styles.phoneView, langView]}>
            <TextInput
                multiline={true}
                keyboardType='numeric'
                placeholder={text}
                placeholderTextColor='#ffffff'
                value={val}
                onChangeText={(text) => OnChange ? OnChange(text) : null}
                style={styles.phoneField}
            />
            <PhoneCode />
        </View>
    )
}

const Register = (props) => {
    const { navigate } = props.navigation
    const { page } = props.route ? props.route.params ? props.route.params : null : null
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const Loading = useSelector(({ home }) => home.registerLoading)
    const Location = useSelector(({ home }) => home.Location)
    const [first_name, setFirstName] = useState('')
    const [last_name, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const _onPress = () => {
        dispatch(registerUser({ first_name, last_name, email, phone, address, password }))
    }
    Location != '' && address != Location ? setAddress(Location) : null
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <View style={styles.circleView}>
                    <Text style={styles.circleText}>{I18n.t('userAuth.register')}</Text>
                </View>
                <BackButton navigation={props.navigation} />
                <View style={{ top: -60 }}>
                    <NameFields
                        val1={first_name}
                        val2={last_name}
                        OnChange1={setFirstName}
                        OnChange2={setSecondName}
                    />
                    <InputField
                        text={I18n.t('userAuth.email')}
                        val={email}
                        OnChange={setEmail}
                    />
                    <InputField
                        text={I18n.t('userAuth.password')}
                        val={password}
                        OnChange={setPassword}
                    />
                    <PhoneField
                        text={I18n.t('userAuth.phone')}
                        val={phone}
                        OnChange={setPhone}
                    />
                    <View style={[styles.addressView, langView]}>
                        <TextInput
                            // multiline={true}
                            placeholder={I18n.t('userAuth.address')}
                            placeholderTextColor='#ffffff'
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            style={[styles.addressStyle]}
                        />
                        <TouchableOpacity onPress={() => navigate('GoogleMaps')}>
                            <Icon type='FontAwesome' name='map-marker' style={styles.addressIcon} />
                        </TouchableOpacity>
                    </View>
                    {!Loading && <TouchableOpacity
                        style={styles.regButton}
                        onPress={() => _onPress()}
                    >
                        <Text style={styles.regText}>{I18n.t('userAuth.reg')}</Text>
                    </TouchableOpacity>}
                    {Loading && <TouchableOpacity
                        style={styles.regButton}
                    >
                        <Spinner size='large' color='#ffffff' />
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => navigate('Login', { page })}>
                        <Text style={styles.loginText}>{I18n.t('userAuth.loginLabel')}{I18n.t('providerAuth.login')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register
