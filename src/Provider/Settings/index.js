import React, { useState } from 'react'
import { Text, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import Header from '../../custom/header';
import { Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import PassSec from './PassSec';
import TermsConds from './TermsConds';
import Privacy from './Privacy';
import LangSec from './LangSec';
import I18n from '../../languages/I18n';
import { getSettings, setAppUserAsync } from '../../Redux/Slices/Main/appUser';
import RNRestart from 'react-native-restart';

const SettingsRow = ({ _text, _sec, _secPress, _onPress }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const langIcon = lang == 'ar' ? 'arrow-left' : 'arrow-right'
    return (
        <TouchableOpacity style={[styles.infoRow, langView]} onPress={() => _secPress ? _secPress(!_sec) : _onPress()}>
            <Text style={[styles.infoText, langText]}>{_text}</Text>
            {!_sec && <Icon type='SimpleLineIcons' name={langIcon} style={styles.rowIcon} />}
            {_sec && <Icon type='SimpleLineIcons' name='arrow-down' style={styles.rowIcon} />}
        </TouchableOpacity>
    )
}

const NotificationRow = () => {
    const [notification, setNotification] = useState(true)
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.infoRow, langView]}>
            <Text style={[styles.infoText, langText]}>{I18n.t('worker.settings.recieveNotification')}</Text>
            <TouchableOpacity style={styles.notificationButton} onPress={() => setNotification(!notification)}>
                {notification && <Icon type='Ionicons' name='ios-checkbox' style={styles.notificationIcon} />}
                {!notification && <Icon type='Ionicons' name='ios-checkbox-outline' style={styles.notificationIcon} />}
            </TouchableOpacity>
        </View>
    )
}

const Settings = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const provider = useSelector(({ provider }) => provider.provider)
    const terms = useSelector(({ appUser }) => appUser.termsCondition)
    const _privacy = useSelector(({ appUser }) => appUser.privacy)
    const dispatch = useDispatch()
    const [passSec, setPassSec] = useState(false)
    const [langSec, setLangSec] = useState(false)
    const [termSec, setTermSec] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    terms || _privacy ? null : dispatch(getSettings({}))

    const _onLogOut = () => {
        dispatch(setAppUserAsync({ user: null }))
        RNRestart.Restart()
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <ScrollView style={styles.Container}>
                <SettingsRow _text={I18n.t('userAuth.changePass')} _sec={passSec} _secPress={setPassSec} />
                {passSec && <PassSec user={provider} />}
                <NotificationRow />
                <SettingsRow _text={I18n.t('worker.settings.changeLang')} _sec={langSec} _secPress={setLangSec} />
                {langSec && <LangSec />}
                <SettingsRow _text={I18n.t('worker.settings.termsConds')} _sec={termSec} _secPress={setTermSec} />
                {termSec && <TermsConds />}
                <SettingsRow _text={I18n.t('worker.settings.privacy')} _sec={privacy} _secPress={setPrivacy} />
                {privacy && <Privacy />}
                <SettingsRow _text={I18n.t('worker.settings.logOut')} _onPress={() => _onLogOut()} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Settings

