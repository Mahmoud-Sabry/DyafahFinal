import React, { useState } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import OrderItem from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, getPastOrders, rateOrder } from '../../Redux/Slices/Main/appUser';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';

const PastOrders = (props) => {
    const { navigation } = props
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const ordersLoading = useSelector(({ appUser }) => appUser.ordersLoading)
    const pastOrders = useSelector(({ appUser }) => appUser.pastOrders)
    const notFound = pastOrders ? pastOrders.length == 0 ? true : false : false
    !pastOrders && api_token ? dispatch(getPastOrders({ api_token })) : null

    const _onOrderPressed = (order_id) => {
        dispatch(getOrderDetails({ api_token, order_id }))
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {ordersLoading && <Spinner size='large' color='#F47421' />}
            {notFound && !ordersLoading &&
                <Text style={styles.notFoundText}>
                    {I18n.t('worker.orders.notFound')}
                </Text>}
            {!api_token && <Text style={styles.authText}>{I18n.t('profile.auth')}</Text>}
            <FlatList
                key='PastOrdersList'
                refreshing={false}
                onRefresh={() => dispatch(getPastOrders({ api_token }))}
                data={pastOrders ? pastOrders : []}
                style={styles.ListStyle}
                renderItem={({ item }) => <OrderItem
                    _onPress={() => _onOrderPressed(item.id)}
                    item={item}
                    navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default PastOrders
