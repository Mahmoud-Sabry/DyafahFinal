import React, { useState } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import Header from '../header'
import styles from './styles'
import CarItem from '../../user/CarsPage/CarItem'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../../Redux/Slices/Main/appUser'
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n'

const Favorites = (props) => {
    const { navigation } = props
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const favorites = useSelector(({ appUser }) => appUser.favorites)
    const gettingFavs = useSelector(({ appUser }) => appUser.gettingFavs)
    !favorites && api_token ? dispatch(getFavorites({ api_token })) : null
    const notFound = favorites ? favorites.length == 0 ? true : false : false

    const _onRefresh = () => {
        dispatch(getFavorites({ api_token }))
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {gettingFavs && <Spinner size='large' color='#F47421' />}
            {notFound && !gettingFavs &&
                <Text style={styles.notFoundText}>
                    {I18n.t('provider.noFavs')}
                </Text>}
            {!api_token && <Text style={styles.authText}>{I18n.t('profile.auth')}</Text>}
            <FlatList
                refreshing={false}
                onRefresh={() => _onRefresh()}
                data={favorites ? favorites : []}
                style={styles.ListStyle}
                renderItem={({ item }) => <CarItem item={item.product} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default Favorites
