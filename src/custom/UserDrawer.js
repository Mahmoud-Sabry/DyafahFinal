import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DrawerItem from './drawerItem';
import I18n from '../languages/I18n';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { setAppUserAsync, setAsyncCart, setUserCart } from '../Redux/Slices/Main/appUser';
import RNRestart from 'react-native-restart';
import LogoutPopup from './LogoutPopup'
import { useState } from 'react';

const customDrawer = (props) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const [modalVisible, setModalVisible] = useState(false)

    const _onLogOut = () => {
        dispatch(setAppUserAsync({ user: null }))
        setModalVisible(false)
        RNRestart.Restart()
    }

    return (
        <LinearGradient colors={['#F47421', '#FE9C31']} style={{ flex: 1 }} >
            <DrawerContentScrollView {...props}>
                <DrawerItem
                    title={I18n.t('drawer.home')}
                    iconName="home" iconType="Octicons"
                    OnPress={() => navigate('Home')}
                />
                <DrawerItem
                    title={I18n.t('drawer.profile')}
                    iconName="person" iconType="Octicons"
                    OnPress={() => navigate('UserProfile')}
                />
                <DrawerItem
                    title={I18n.t('drawer.search')}
                    iconName="search" iconType="Feather"
                    OnPress={() => navigate('SearchFilter')}
                />
                <DrawerItem
                    title={I18n.t('drawer.orders')}
                    iconName="list-alt" iconType="FontAwesome"
                    OnPress={() => navigate('PastOrders')}
                />
                <DrawerItem
                    title={I18n.t('drawer.cart')}
                    iconName="cart" iconType="MaterialCommunityIcons"
                    OnPress={() => navigate('Cart')}
                />
                <DrawerItem
                    title={I18n.t('drawer.favorite')}
                    iconName="heart" iconType="AntDesign"
                    OnPress={() => navigate('Favorites')}
                />
                <DrawerItem
                    title={I18n.t('drawer.about')}
                    iconName="info" iconType="AntDesign"
                    OnPress={() => navigate('About')}
                />
                {!api_token && <DrawerItem
                    title={I18n.t('drawer.login')}
                    iconName="log-in" iconType="Feather"
                    OnPress={() => navigate('Login', { page: null })} //
                />}
                {api_token && <DrawerItem
                    title={I18n.t('drawer.logout')}
                    iconName="log-out" iconType="Feather"
                    OnPress={() => setModalVisible(true)} // navigate('Register')}
                />}
                <TouchableOpacity
                    onPress={() => navigate('ServicesMenu')}
                    style={{
                        flex: 1,
                        marginVertical: 35,
                        alignSelf: 'center',
                        backgroundColor: '#ffffff',
                        paddingVertical: 10,
                        paddingHorizontal: 25,
                        borderRadius: 20,
                    }}>
                    <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 15, color: '#64615E' }} >
                        {I18n.t('drawer.logAsProvider')}
                    </Text>
                </TouchableOpacity>
                {/* Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    onRequestClose={() => setModalVisible(false)}>
                    <LogoutPopup OnPress={setModalVisible} _onConfirm={() => _onLogOut()} />
                </Modal>
            </DrawerContentScrollView>
        </LinearGradient>
    )
}

export default customDrawer
