import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import styles from './styles'
import Header from '../../custom/header';
import WorkerStatus from './WorkerStatus';
import WorkerRates from './WorkerRates';
import WorkerTotalOrders from './WorkerTotalOrders';
import ShowOrdersButton from './ShowOrderButton';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import { getHome, getRates } from '../../Redux/Slices/Worker/info';
import { requestUserPermission } from '../../custom/FCMNotifications';
import { setNotifiToken } from '../../Redux/Slices/Main/appUser';


const Home = (props) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const deviceToken = useSelector(({ appUser }) => appUser.deviceToken)
    const tokenSent = useSelector(({ appUser }) => appUser.tokenSent)
    const home = useSelector(({ worker }) => worker.home)
    const rates = useSelector(({ worker }) => worker.rates)
    const homeLoading = useSelector(({ worker }) => worker.homeLoading)
    const ratesLoading = useSelector(({ worker }) => worker.ratesLoading)

    // console.log('setNotifiToken: ', api_token && deviceToken && !tokenSent)
    // api_token && deviceToken && !tokenSent ? dispatch(setNotifiToken({ api_token, token: deviceToken })) : null

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {homeLoading && <Spinner size='large' color='#F7921F' />}
            {home &&
                <ScrollView style={styles.Container} >
                    <WorkerStatus />
                    <WorkerRates OnPress={() => props.navigation.navigate('WorkerComments')} />
                    <WorkerTotalOrders _conut={home ? home.completed_orders : 0} />
                    <ShowOrdersButton OnPress={() => props.navigation.navigate('Orders')} />
                </ScrollView>}
        </SafeAreaView>
    )
}

export default Home