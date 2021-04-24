import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import { formatData } from './formatData';
import FoodItem from './FoodItem';
import EmptyItem from './EmptyItem';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { getKashtaProducts } from '../../Redux/Slices/User/home';

const FoodList = ({ name, OnPress, numCols, listData }) => {
    const dispatch = useDispatch()
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const lang = useSelector(({ language }) => language.language)
    const numColumns = numCols ? numCols : 3
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <></> // <EmptyItem item={item} /> // If Empty

        } else return <FoodItem item={item} OnPress={OnPress} />  // Else
    };

    const _onRefresh = () => {

        dispatch(getKashtaProducts({ api_token }))
        dispatch(getPopularProducts({ api_token }))
    }

    return (
        <View>
            <Text style={[styles.ListName, langText]}>{name}</Text>
            {listData.length == 0 && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            {listData.length > 0 && <FlatList
                refreshing={false}
                // onRefresh={() => _onRefresh()}
                key={'FoodFlatList'}
                horizontal={false}
                numColumns={numColumns}
                data={formatData(listData, numColumns)}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => renderItem({ item, index })}
                style={styles.listContainer}
            />}
            <View style={styles.lineView} />
        </View>
    )
}

export default FoodList
