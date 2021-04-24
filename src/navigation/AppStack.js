import 'react-native-gesture-handler';
import * as React from 'react';
import { I18nManager, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from '../languages/I18n';
import { useSelector, useDispatch } from 'react-redux';
import { getLang } from '../Redux/Slices/Main/language';
import { getAppUser, getAsyncCart } from '../Redux/Slices/Main/appUser';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen'
// components 
import { requestUserPermission } from '../custom/FCMNotifications';
import UserDrawer from './userDrawer';
import ServicesMenu from '../AppAuth/ServicesMenu';
import CarReg from '../AppAuth/CarReg';
import WorkerReg from '../AppAuth/WorkerReg';
import Login from '../AppAuth/Login';
import WorkerDrawer from './WorkerDrawer';
import ProviderDrawer from './ProviderDrawer';
import { Spinner } from 'native-base';
import ConfirmEmail from '../custom/ForgetPassword/confirmEmail';
import ConfirmCode from '../custom/ForgetPassword/confirmCode';
import ChangePassword from '../custom/ForgetPassword/changePass';
//
const { height } = Dimensions.get('screen')
const Stack = createStackNavigator();

async function fetchLanguage(dispatch) {
    await dispatch(getLang())
}

async function fetchAppUser(dispatch) {
    await dispatch(getAppUser())
}

const AppStack = () => {
    I18nManager.isRTL ? RNRestart.Restart() : null;
    const language = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const success = useSelector(({ appUser }) => appUser.success)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const dispatch = useDispatch()
    fetchLanguage(dispatch)
    success ? SplashScreen.hide() : fetchAppUser(dispatch)
    requestUserPermission()
    Cart ? null : dispatch(getAsyncCart())
    I18n.locale = language == '' ? 'ar' : language
    let appStart = 'UserDrawer'

    if (success) {
        const { type, role } = appUser ? appUser : ['user', 'user']
        appStart = type == 'coffee' || type == 'chef' ? 'WorkerDrawer' :
            role == 'provider' ? 'ProviderDrawer' :
                'UserDrawer'
    }

    if (!success || appUser == null) {
        return (
            <>
                <Spinner size='large' color='#F47421' style={{ alignSelf: 'center', marginTop: height * .4 }} />
            </>
        )
    } else return (
        <Stack.Navigator headerMode='none' initialRouteName={appStart}>
            {/* User Part */}
            <Stack.Screen name="UserDrawer" component={UserDrawer} />
            {/* App Auth */}
            <Stack.Screen name="ServicesMenu" component={ServicesMenu} />
            <Stack.Screen name="CarReg" component={CarReg} />
            <Stack.Screen name="WorkerReg" component={WorkerReg} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ProviderForget" component={ConfirmEmail} />
            <Stack.Screen name="ProviderConfirmCode" component={ConfirmCode} />
            <Stack.Screen name="ProviderChangePassword" component={ChangePassword} />
            {/* Worker Part */}
            <Stack.Screen name="WorkerDrawer" component={WorkerDrawer} />
            {/* Provider Part */}
            <Stack.Screen name="ProviderDrawer" component={ProviderDrawer} />
        </Stack.Navigator>
    );
}
export default AppStack;