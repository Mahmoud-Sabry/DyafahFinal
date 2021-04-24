import React, { useState } from 'react'
import { FlatList, TouchableOpacity, Text } from 'react-native'
import styles from './styles';
import OrderInfo from './OrderInfo';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import { Spinner } from 'native-base';
import { getPreparingOrders } from '../../Redux/Slices/Provider/info';

const UnderWayOrder = ({ item, _onPress }) => {
    const [staus, setStatus] = useState('key0')
    return (
        <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => _onPress ? _onPress() : null}
        >
            <OrderInfo _order={item} _OrderStatus={true} />
        </TouchableOpacity>
    )
}

const UnderWay = (props) => {
    const dispatch = useDispatch()
    const language = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const loading = useSelector(({ provider }) => provider.preparingLoading)
    const preparingOrders = useSelector(({ provider }) => provider.preparingOrders)
    const renderOrder = ({ item }) => {
        return (
            <UnderWayOrder
                item={item}
            // _onPress={() => props.navigation.navigate('FinishedDetails')}
            />
        )
    }
    return (
        <>
            {loading && <Spinner size='large' color='#F47421' />}
            {!loading && preparingOrders.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                key={'UnderWayProviderOrders'}
                refreshing={false}
                onRefresh={() => dispatch(getPreparingOrders({ token: api_token }))}
                data={preparingOrders ? preparingOrders : []}
                style={styles.ListStyle}
                keyExtractor={item => item.id}
                renderItem={(item) => renderOrder(item)}
            />
        </>
    )
}

export default UnderWay

