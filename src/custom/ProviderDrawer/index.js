import React, { useCallback } from 'react';
import { TouchableOpacity, Text, View, Image, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { dyafah } from '../../assets/consts';
import { setAppUserAsync, setAsyncCart, setUserCart } from '../../Redux/Slices/Main/appUser';
import RNRestart from 'react-native-restart';
import { Icon } from 'native-base';
import { getProviderRates } from '../../Redux/Slices/Provider/info';

const WorkerMenuButton = ({ OnPress, title, source }) => {
    return (
        <TouchableOpacity
            style={styles.ButtonContainer}
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
            <Image
                style={styles.InfoImage}
                source={uri ? { uri } : require('../../assets/images/monaShop.png')}
            />
            <Text style={styles.InfoName}>{name}</Text>
            <View style={styles.iconView}><Icon type='FontAwesome5' name='user-edit' style={styles.icon} /></View>
        </TouchableOpacity>
    )
}

const ProviderDrawer = (props) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const lang = useSelector(({ language }) => language.language)
    const provider = useSelector(({ provider }) => provider.provider)
    const { ar_name, en_name, image } = provider ? provider : [I18n.t('provider.notFound'), null]
    const _onLogOut = () => {
        dispatch(setAppUserAsync({ user: null }))
        RNRestart.Restart()
    }

    // const _handlePress = useCallback(async () => {
    async function _handlePress() {
        const { id } = provider
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

    const _goToRates = () => {
        const { api_token } = provider
        dispatch(getProviderRates({ api_token }))
        navigate('ProviderComments')
    }

    return (
        <View style={styles.Container} >
            <DrawerContentScrollView {...props}>
                <WorkerMenuInfo
                    name={lang == 'ar' ? ar_name : en_name}
                    uri={image ? `${dyafah}${image}` : null}
                    _onPress={() => props.navigation.navigate('Profile')}
                />
                <WorkerMenuButton
                    OnPress={() => props.navigation.navigate('Orders')}
                    source={require('../../assets/images/menuList.png')}
                    title={I18n.t('provider.drawer.orders')}
                />
                <WorkerMenuButton
                    OnPress={() => props.navigation.navigate('Products')}
                    source={require('../../assets/images/orders.png')}
                    title={I18n.t('provider.drawer.products')}
                />
                <WorkerMenuButton
                    OnPress={() => props.navigation.navigate('Offers')}
                    source={require('../../assets/images/commerce.png')}
                    title={I18n.t('provider.drawer.offers')}
                />
                <WorkerMenuButton
                    lang={lang}
                    OnPress={() => _goToRates()}
                    source={require('../../assets/images/stars.png')}
                    title={I18n.t('worker.drawer.rates')}
                />
                <WorkerMenuButton
                    OnPress={() => props.navigation.navigate('PastOrders')}
                    source={require('../../assets/images/bag.png')}
                    title={I18n.t('provider.drawer.pastOrders')}
                />
                <WorkerMenuButton
                    OnPress={() => props.navigation.navigate('Favorites')}
                    source={require('../../assets/images/heart.png')}
                    title={I18n.t('drawer.favorite')}
                />
                <WorkerMenuButton
                    OnPress={() => _handlePress()}
                    source={require('../../assets/images/financial.png')}
                    title={I18n.t('provider.acc_state')}
                />
                <WorkerMenuButton
                    OnPress={() => props.navigation.navigate('Settings')}
                    source={require('../../assets/images/electronics.png')}
                    title={I18n.t('provider.drawer.settings')}
                />
                <WorkerMenuButton
                    OnPress={() => _onLogOut()}
                    source={require('../../assets/images/exit.png')}
                    title={I18n.t('worker.settings.logOut')}
                />
            </DrawerContentScrollView>
        </View>
    )
}

export default ProviderDrawer
