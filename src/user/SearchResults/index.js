import React, { useState } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import styles from './styles'
import CarItem from '../CarsPage/CarItem'
import { useSelector } from 'react-redux'
import { Spinner } from 'native-base'
import I18n from '../../languages/I18n'
import CustHeader from '../../custom/NormalSearch/CustHeader'

const SearchResults = (props) => {
    const { navigation } = props
    const searchResults = useSelector(({ home }) => home.searchResults)
    const searchLoading = useSelector(({ home }) => home.searchLoading)
    return (
        <SafeAreaView style={styles.Container}>
            <CustHeader props={props} />
            {searchLoading && <Spinner size='large' color='#F47421' />}
            {!searchLoading && searchResults.length == 0 && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                data={searchResults ? searchResults : []}
                style={styles.ListStyle}
                renderItem={({ item }) => <CarItem item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default SearchResults
