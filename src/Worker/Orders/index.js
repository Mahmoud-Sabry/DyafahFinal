import * as React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBar from '../../custom/TabBar';
import Header from '../../custom/header';
import Finished from './Finished';
import Waiting from './Waiting';
import NewOrders from './New';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function Orders(props) {
    const lang = useSelector(({ language }) => language.language)
    const label = lang == 'en' ? true : false
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Header props={props} />
            <Tab.Navigator tabBar={props => <TabBar {...props} />} initialRouteName='NewOrders' >
                <Tab.Screen
                    name='Finished'
                    component={Finished}
                    options={{ tabBarLabel: label ? I18n.t('worker.orders.finished') : I18n.t('worker.orders.new') }}
                />
                <Tab.Screen
                    name='Waiting'
                    component={Waiting}
                    options={{ tabBarLabel: I18n.t('worker.orders.waiting') }}
                />
                <Tab.Screen
                    name='NewOrders'
                    component={NewOrders}
                    options={{ tabBarLabel: !label ? I18n.t('worker.orders.finished') : I18n.t('worker.orders.new') }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}
