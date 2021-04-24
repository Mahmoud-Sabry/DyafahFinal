import React, { useState } from 'react'
import { FlatList, Text } from 'react-native'
import styles from './styles';
import NewOrder from './NewOrder';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';
import { getNewOrders } from '../../Redux/Slices/Provider/info';

const NewOrders = (props) => {
    const dispatch = useDispatch()
    const language = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const loading = useSelector(({ provider }) => provider.newLoading)
    const newOrders = useSelector(({ provider }) => provider.newOrders)
    console.log('newOrders: ', newOrders)
    const renderOrder = ({ item }) => {
        return (
            <NewOrder
                item={item}
            // _onPress={() => props.navigation.navigate('CanceledDetails')}
            />
        )
    }
    return (
        <>
            {loading && <Spinner size='large' color='#F47421' />}
            {!loading && newOrders.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                key={'NewProviderOrders'}
                refreshing={false}
                onRefresh={() => dispatch(getNewOrders({ token: api_token }))}
                data={newOrders ? newOrders : []}
                style={styles.ListStyle}
                keyExtractor={item => item.id}
                renderItem={(item) => renderOrder(item)}
            />
        </>
    )
}

export default NewOrders
