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
import { resetPass } from '../../Redux/Slices/User/home';
import BackButton from '../BackButton';

const InputField = ({ val, OnChange, text }) => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setEditable(true);
    }, []);
    return (
        <TextInput
            editable={editable}
            placeholder={text}
            placeholderTextColor='#ffffff'
            value={val}
            onChangeText={(text) => OnChange ? OnChange(text) : null}
            style={styles.inputField}
        />
    )
}

const ChangePassword = (props) => {
    const { type } = props.route.params
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const user = useSelector(({ home }) => home.user)
    const loading = useSelector(({ home }) => home.forgetLoading)
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    const _onPress = () => {
        const { api_token } = user
        if (pass1 != '' && pass2 != '' && pass1 == pass2) {
            dispatch(resetPass({ api_token, password: pass1, type }))
        } else {
            ShowToast(I18n.t('errors.resetPass'), 'warning')
        }
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <View style={styles.circleView}>
                    <Text style={styles.circleText}>{I18n.t('userAuth.changePass')}</Text>
                </View>
                <BackButton navigation={props.navigation} />
                <InputField
                    text={I18n.t('userAuth.newPass')}
                    val={pass1}
                    OnChange={setPass1}
                />
                <InputField
                    text={I18n.t('userAuth.confNewPass')}
                    val={pass2}
                    OnChange={setPass2}
                />
                {loading && <Spinner size='large' color='#ffffff' style={styles.regButton} />}
                {!loading && <TouchableOpacity
                    style={styles.regButton}
                    onPress={() => _onPress()}
                >
                    <Text style={styles.regText}>{I18n.t('userAuth.change')}</Text>
                </TouchableOpacity>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChangePassword
