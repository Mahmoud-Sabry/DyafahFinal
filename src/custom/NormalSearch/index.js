import React from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import styles from './styles'
import CarItem from '../../user/CarsPage/CarItem';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';
import CustHeader from './CustHeader';
import ColoredButton from '../ColoredButton';

const SearchResults = (props) => {
    const { navigation } = props
    const lang = useSelector(({ language }) => language.language)
    const searchResults = useSelector(({ home }) => home.searchResults)
    const searchLoading = useSelector(({ home }) => home.searchLoading)

    return (
        <SafeAreaView style={styles.Container}>
            <CustHeader props={props} />
            <ColoredButton
                ContStyle={styles.detailSearchButton}
                title={I18n.t('searchFilter.detailedSearch')}
                OnPress={() => props.navigation.navigate('SearchFilter')}
            />
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
