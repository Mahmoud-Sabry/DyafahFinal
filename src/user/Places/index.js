import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import Place from './place';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../../Redux/Slices/User/home';
import CarItem from '../CarsPage/CarItem';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';

const Places = (props) => {
    const { navigation } = props
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const places = useSelector(({ home }) => home.places)
    const placesCurrent = useSelector(({ home }) => home.placesCurrent)
    const placesNext = useSelector(({ home }) => home.placesNext)
    const placesLoading = useSelector(({ home }) => home.placesLoading)
    const dispatch = useDispatch()
    places.length > 0 ? null : dispatch(getPlaces({ api_token: appUser ? appUser.api_token : null, page: 1 }))

    const _refresh = () => {
        dispatch(getPlaces({ api_token: appUser.api_token, page: 1 }))
    }
    const _getMorePlaces = () => {
        placesNext ? dispatch(getPlaces({ api_token: appUser.api_token, page: placesCurrent + 1 })) : null
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {placesLoading && <Spinner size='large' color='#F7901F' />}
            {!placesLoading && places.length == 0 && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                key='PlacesList'
                refreshing={false}
                onRefresh={() => _refresh()}
                data={places}
                style={styles.ListStyle}
                renderItem={({ item }) => <CarItem item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                onEndReached={() => _getMorePlaces()}
                onEndReachedThreshold={.5}
            />
        </SafeAreaView>
    )
}

export default Places
