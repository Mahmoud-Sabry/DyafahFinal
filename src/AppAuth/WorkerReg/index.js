import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { DatePicker, Spinner } from 'native-base';
import styles from './styles'
import { regProvider, resetRegProvider } from '../../Redux/Slices/Auth/registerProvider';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import BackButton from '../../custom/BackButton';
import PhoneCode from '../../custom/PhoneCode';

const InputField = ({ val, OnChange, text, numeric, opt, phone }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const label = opt ? I18n.t('providerAuth.mandatory') : I18n.t('providerAuth.optional')
    return (
        <View style={[styles.inputView, langView]}>
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                placeholder={text}
                placeholderTextColor='#ffffff'
                value={val}
                onChangeText={(text) => OnChange ? OnChange(text) : null}
                style={styles.inputField}
            />
            {phone && <PhoneCode />}
            {!phone && <Text style={styles.labelField}>{label}</Text>}
        </View>
    )
}

const WorkerReg = (props) => {
    const { navigation, route } = props
    const { type } = route.params
    const lang = useSelector(({ language }) => language.language)
    const Error = useSelector(({ registerProvider }) => registerProvider.error)
    const Fail = useSelector(({ registerProvider }) => registerProvider.fail)
    const Success = useSelector(({ registerProvider }) => registerProvider.success)
    const Loading = useSelector(({ registerProvider }) => registerProvider.loading)
    const dispatch = useDispatch()
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const label = I18n.t('providerAuth.optional') // : I18n.t('providerAuth.mandatory')
    const [name, setName] = useState('')
    const [ar_name, setAR_Name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [birth, setBirth] = useState(I18n.t('providerAuth.workerReg.birthDate'))
    const [id, setID] = useState('')
    const [exp, setExp] = useState('')
    const _onPress = () => {
        dispatch(regProvider({
            name: name, ar_name, email: email, phone: phone, type: type,
            birth: I18n.t('providerAuth.workerReg.birthDate') == birth ? null : birth,
            id: id, exp: exp, password: password
        }))
    }
    if (Success) {
        navigation.push('Login')
        dispatch(resetRegProvider())
    }
    const SetDate = (date) => {
        let d = new Date(date);
        setBirth(d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear())
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <View style={styles.circleView}>
                    <Text style={styles.circleText}>{I18n.t('providerAuth.workerReg.workerReg')}</Text>
                </View>
                <BackButton navigation={navigation} />
                <View style={{ top: -60 }}>
                    <InputField
                        text={I18n.t('providerAuth.name') + I18n.t('arabic')}
                        val={ar_name}
                        OnChange={setAR_Name}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.name') + I18n.t('english')}
                        val={name}
                        OnChange={setName}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.email')}
                        val={email}
                        OnChange={setEmail}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.password')}
                        val={password}
                        OnChange={setPassword}
                        opt={true}
                    />
                    <InputField
                        text={I18n.t('providerAuth.phone')}
                        numeric={true}
                        val={phone}
                        OnChange={setPhone}
                        opt={true}
                        phone={true}
                    />
                    <View style={[styles.inputView, langView]}>
                        <DatePicker
                            defaultDate={new Date()}
                            minimumDate={new Date(1960, 1, 1)}
                            locale={lang}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText={birth}
                            textStyle={[styles.inputField]} //{{ color: "green" }}
                            placeHolderTextStyle={styles.inputField} //{{ color: "#d3d3d3" }}
                            onDateChange={(date) => SetDate(date)} // console.log("Date : ", new Date(date).toDateString())}
                            disabled={false}
                        />
                        <Text style={styles.labelField}>{label}</Text>
                    </View>
                    <InputField
                        text={I18n.t('providerAuth.workerReg.id')}
                        val={id}
                        OnChange={setID}
                    />
                    <InputField
                        text={I18n.t('providerAuth.workerReg.exp')}
                        numeric={true}
                        val={exp}
                        OnChange={setExp}
                    />
                    {!Loading && <TouchableOpacity
                        style={styles.regButton}
                        onPress={() => _onPress()}
                    >
                        <Text style={styles.regText}>{I18n.t('providerAuth.reg')}</Text>
                    </TouchableOpacity>}
                    {Loading && <Spinner size='large' color='#ffffff' />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WorkerReg
