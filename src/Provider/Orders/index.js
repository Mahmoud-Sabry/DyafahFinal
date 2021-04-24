import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from '../../custom/header';
import TabBar from './TabBar';
import styles from './styles';
import NewOrders from './NewOrders';
import Finished from './Finished';
import UnderWay from './UnderWay';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import { requestUserPermission } from '../../custom/FCMNotifications';
import { setNotifiToken } from '../../Redux/Slices/Main/appUser';
const Tab = createMaterialTopTabNavigator();

export default function Orders(props) {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const deviceToken = useSelector(({ appUser }) => appUser.deviceToken)
    const tokenSent = useSelector(({ appUser }) => appUser.tokenSent)
    api_token && deviceToken && !tokenSent ? dispatch(setNotifiToken({ api_token, token: deviceToken })) : null
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F4F1' }}>
            <Header props={props} />
            <Tab.Navigator style={styles.tabsContainer} tabBar={props => <TabBar {...props} />} initialRouteName='New' >
                <Tab.Screen
                    name='Finished'
                    component={Finished}
                    options={{ tabBarLabel: lang == 'en' ? I18n.t('provider.orders.finished') : I18n.t('provider.orders.new') }}
                />
                <Tab.Screen
                    name='UnderWay'
                    component={UnderWay}
                    options={{ tabBarLabel: I18n.t('provider.orders.underWay') }}
                />
                <Tab.Screen
                    name='New'
                    component={NewOrders}
                    options={{ tabBarLabel: lang == 'ar' ? I18n.t('provider.orders.finished') : I18n.t('provider.orders.new') }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}
