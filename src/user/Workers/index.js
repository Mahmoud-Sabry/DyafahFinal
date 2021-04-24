import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import Worker from './worker'
import { useSelector, useDispatch } from 'react-redux'
import { getChefWorkers, getCoffeeWorkers } from '../../Redux/Slices/User/home'
import { dyafah } from '../../assets/consts';
import { Spinner } from 'native-base'

const Workers = (props) => {
    const { navigate } = props.navigation
    const { type } = props.route.params
    const dispatch = useDispatch()
    const chefs = useSelector(({ home }) => home.chefs)
    const chefsCurrent = useSelector(({ home }) => home.chefsCurrent)
    const chefsNext = useSelector(({ home }) => home.chefsNext)
    const chefsLoading = useSelector(({ home }) => home.chefsLoading)
    const coffees = useSelector(({ home }) => home.coffees)
    const coffeesCurrent = useSelector(({ home }) => home.coffeesCurrent)
    const coffeesNext = useSelector(({ home }) => home.coffeesNext)
    const coffeeLoading = useSelector(({ home }) => home.coffeeLoading)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    chefs.length == 0 ? dispatch(getChefWorkers({ api_token, page: 1 })) : null
    coffees.length == 0 ? dispatch(getCoffeeWorkers({ api_token, page: 1 })) : null
    let data = []
    let bool = false
    if (type == 'both') {
        let tempData = [...chefs, ...coffees]
        bool = chefsLoading && coffeeLoading
        tempData.forEach(item => {
            data.push({ ...item })
        })
    } else if (type == 'chef') {
        bool = chefsLoading
        chefs.forEach(item => {
            data.push({ ...item })
        })
    } else {
        bool = coffeeLoading
        coffees.forEach(item => {
            data.push({ ...item })
        })
    }

    const _onRefresh = () => {
        if (type == 'both') {
            dispatch(getChefWorkers({ api_token, page: 1 }))
            dispatch(getCoffeeWorkers({ api_token, page: 1 }))
        } else if (type == 'chef') {
            dispatch(getChefWorkers({ api_token, page: 1 }))
        } else { dispatch(getCoffeeWorkers({ api_token, page: 1 })) }
    }

    const _getMoreWorkers = () => {
        if (type == 'both') {
            chefsNext ? dispatch(getChefWorkers({ api_token, page: chefsCurrent + 1 })) : null
            coffeesNext ? dispatch(getCoffeeWorkers({ api_token, page: coffeesCurrent + 1 })) : null
        } else if (type == 'chef') {
            chefsNext ? dispatch(getChefWorkers({ api_token, page: chefsCurrent + 1 })) : null
        } else { coffeesNext ? dispatch(getCoffeeWorkers({ api_token, page: coffeesCurrent + 1 })) : null }
    }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {bool && data.length == 0 && <Spinner size='large' color='#F47421' />}
            {!bool && data.length == 0 && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            {data.length > 0 && <FlatList
                key='workersList'
                refreshing={chefsLoading && coffeeLoading}
                onRefresh={() => _onRefresh()}
                data={data}
                style={styles.ListStyle}
                renderItem={({ item }) => <Worker item={item} navigate={navigate} />}
                keyExtractor={item => item.id}
                onEndReached={() => _getMoreWorkers()}
                onEndReachedThreshold={.5}
            />}
        </SafeAreaView>
    )
}

export default Workers
