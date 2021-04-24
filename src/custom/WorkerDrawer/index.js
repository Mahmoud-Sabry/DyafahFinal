import React, { useCallback } from 'react';
import { TouchableOpacity, Text, View, Image, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { dyafah } from '../../assets/consts';
import { setAppUserAsync, setAsyncCart, setUserCart } from '../../Redux/Slices/Main/appUser';
import RNRestart from 'react-native-restart';
import { Icon } from 'native-base';

const WorkerMenuButton = ({ OnPress, title, source, lang }) => {
    return (
        <TouchableOpacity
            style={[styles.ButtonContainer]}  //, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
            onPress={() => OnPress ? OnPress() : null}
        >
            <Image source={source} style={styles.ButtonImage} defaultSource={require('../../assets/images/logo.png')} />
            <Text style={styles.ButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const WorkerMenuInfo = ({ name, uri, _onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => _onPress ? _onPress() : null}
            style={styles.InfoContainer}
        >
            <Image style={styles.InfoImage} source={uri} defaultSource={require('../../assets/images/logo.png')}/>
            <Text style={styles.InfoName}>{name}</Text>
            <View style={styles.iconView}><Icon type='FontAwesome5' name='user-edit' style={styles.icon} /></View>
        </TouchableOpacity>
    )
}

const WorkerDrawer = (props) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const lang = useSelector(({ language }) => language.language)
    const user = useSelector(({ worker }) => worker.user)
    // console.log("WorkerDrawer: ", `${dyafah}${user.image}`)
    const rates = useSelector(({ worker }) => worker.rates)
    const url = user ? user.image ? { uri: `${dyafah}${user.image}` } : require('../../assets/images/logo.png') : require('../../assets/images/logo.png')
    const _onLogOut = () => {
        dispatch(setAppUserAsync({ user: null }))
        RNRestart.Restart()
    }

    async function _handlePress() {
        const { id } = user
        console.log("_handlePress: ", id)
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(`https://dyafa.dtagdev.com/provider/orderstatments?user_id=${id}`);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(`https://dyafa.dtagdev.com/provider/orderstatments?user_id=${id}`);
        } else {
            alert(`Connection Error`);
        }
    }

    return (
        <View style={styles.Container} >
            <DrawerContentScrollView {...props}>
                <WorkerMenuInfo
                    name={user ? lang == 'ar' ? user.ar_name : user.en_name : 'name'}
                    uri={url}
                    _onPress={() => navigate('Profile')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => navigate('Home')}
                    source={require('../../assets/images/home.png')}
                    title={I18n.t('worker.drawer.homePage')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => navigate('Orders')}
                    source={require('../../assets/images/tick.png')}
                    title={I18n.t('worker.drawer.orders')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => navigate('WorkerComments')}
                    source={require('../../assets/images/stars.png')}
                    title={I18n.t('worker.drawer.rates')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => navigate('PastOrders')}
                    source={require('../../assets/images/bag.png')}
                    title={I18n.t('provider.drawer.pastOrders')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => navigate('Favorites')}
                    source={require('../../assets/images/heart.png')}
                    title={I18n.t('drawer.favorite')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => _handlePress()}
                    source={require('../../assets/images/financial.png')}
                    title={I18n.t('provider.acc_state')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => navigate('Settings')}
                    source={require('../../assets/images/electronics.png')}
                    title={I18n.t('worker.drawer.settings')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => _onLogOut()}
                    source={require('../../assets/images/exit.png')}
                    title={I18n.t('worker.settings.logOut')}
                />
            </DrawerContentScrollView>
        </View>
    )
}

export default WorkerDrawer
