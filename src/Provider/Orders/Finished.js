import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from './styles';
import OrderInfo from './OrderInfo';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import { getFinishedOrders } from '../../Redux/Slices/Provider/info';
import { Spinner } from 'native-base';
const FinishedOrder = ({ item, _onPress }) => {
    const [staus, setStatus] = useState('key1')
    return (
        <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => _onPress ? _onPress() : null}
        >
            <OrderInfo _order={item} _OrderStatus={false} />
        </TouchableOpacity>
    )
}

const Finished = (props) => {
    const dispatch = useDispatch()
    const language = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const loading = useSelector(({ provider }) => provider.finishedLoading)
    const finishedOrders = useSelector(({ provider }) => provider.finishedOrders)
    const renderOrder = ({ item }) => {
        return (
            <FinishedOrder
                item={item}
            // _onPress={() => props.navigation.navigate('FinishedDetails')}
            />
        )
    }
    return (
        <>
            {loading && <Spinner size='large' color='#F47421' />}
            {!loading && finishedOrders.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                key={'FinishedProviderOrders'}
                refreshing={false}
                onRefresh={() => dispatch(getFinishedOrders({ token: api_token }))}
                data={finishedOrders ? finishedOrders : []}
                style={styles.ListStyle}
                keyExtractor={item => item.id}
                renderItem={(item) => renderOrder(item)}
            />
        </>
    )
}

export default Finished

