import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import CarItem from './CarItem';
import I18n from '../../languages/I18n';
// 
import { useSelector, useDispatch } from 'react-redux';
// import { useNetInfo } from "@react-native-community/netinfo";
import { getCarProducts } from '../../Redux/Slices/User/home';
import { Spinner } from 'native-base';
// 
const CarsPage = (props) => {
    const { navigation } = props
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const carLoading = useSelector(({ home }) => home.carLoading)
    const carProducts = useSelector(({ home }) => home.carProducts)
    const carsNext = useSelector(({ home }) => home.carsNext)
    const carsCurrent = useSelector(({ home }) => home.carsCurrent)
    const dispatch = useDispatch()
    carProducts.length == 0 ? dispatch(getCarProducts({ api_token: appUser ? appUser.api_token : null })) : null

    const _refresh = () => {
        dispatch(getCarProducts({ api_token: appUser.api_token, page: 1 }))
    }
    const _getMoreCars = () => {
        carsNext ? dispatch(getCarProducts({ api_token: appUser.api_token, page: carsCurrent + 1 })) : null
    }
    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {carLoading && <Spinner size='large' color='#F7901F' />}
            {!carLoading && carProducts.length == 0 && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                key='CarsList'
                refreshing={false}
                onRefresh={() => _refresh()}
                data={carProducts}
                style={styles.ListStyle}
                renderItem={({ item }) => <CarItem item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                onEndReached={() => _getMoreCars()}
                onEndReachedThreshold={.5}
            />
        </SafeAreaView>
    )
}

export default CarsPage