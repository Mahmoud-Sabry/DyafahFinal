import 'react-native-gesture-handler';
// import * as React from 'react';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, I18nManager, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { Root } from 'native-base';

console.disableYellowBox = true;

// components
import AppStack from './AppStack';
import store from '../Redux/store';
// 

const AppNavigation = () => {
    // Language Setting
    // I18n.locale = "ar"; // RNLocalize.getLocales()[0].languageCode;
    I18nManager.allowRTL(false);
    // console.log("isRTL ? ", I18nManager.isRTL);
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('new FCM message: ', remoteMessage)
        });

        return unsubscribe;
    }, []);
    return (
        <Root >
            <Provider store={store} >
                <SafeAreaView style={{ flex: 1 }}  >
                    <NavigationContainer>
                        <AppStack />
                    </NavigationContainer>
                </SafeAreaView>
            </Provider>
        </Root>
    )
}

export default AppNavigation

