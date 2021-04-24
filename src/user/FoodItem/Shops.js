import React, { useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { formatData } from '../../custom/FoodList/formatData';
import styles from './styles';
import { dyafah } from '../../assets/consts';
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux';


const numColumns = 4;
const Shops = ({ _shops }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const [shops, setShops] = useState([
        { id: 1, uri: require('../../assets/images/monaShop.png') },
        { id: 2, uri: require('../../assets/images/hasShop.png') },
        { id: 3, uri: require('../../assets/images/shermany.png') },
        { id: 4, uri: require('../../assets/images/5erShop.png') },
        // { id: 5, uri: require('../../assets/images/monaShop.png') },
        // { id: 6, uri: require('../../assets/images/hasShop.png') },
        // { id: 7, uri: require('../../assets/images/shermany.png') },
        // { id: 8, uri: require('../../assets/images/5erShop.png') }
    ])

    renderItem = ({ item, index }) => {
        const { image } = item
        if (item.empty === true)
            return <></> // <EmptyItem item={item} /> // If Empty
        return (
            <Image
                source={image ? { uri: `${dyafah}${image}` } : item.uri}
                style={styles.shopImage}
            />
        )
    }

    return (
        <View style={styles.shopsView}>
            <Text style={[styles.ListName, langText]}>{I18n.t('product.providers')}</Text>
            <FlatList
                horizontal={false}
                data={formatData(_shops ? _shops : shops, numColumns)}
                style={styles.listContainer}
                renderItem={({ item, index }) => renderItem({ item, index })}
                numColumns={numColumns}
            />
        </View>
    )
}

export default Shops
