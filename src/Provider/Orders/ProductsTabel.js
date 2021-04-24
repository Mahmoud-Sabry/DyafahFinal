import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux'

const ProductsTabel = () => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    // const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.orderinfoRow, langView]}>
            <Text style={styles.tabelTitle}>{I18n.t('provider.orders.products')}</Text>
            <Text style={styles.tabelTitle}>{I18n.t('provider.orders.price')}</Text>
            <Text style={styles.salary}>{I18n.t('provider.orders.quantity')}</Text>
            <Text style={styles.tabelTitle}>{I18n.t('provider.orders.totalPrice')}</Text>
        </View>
    )
}

export default ProductsTabel;