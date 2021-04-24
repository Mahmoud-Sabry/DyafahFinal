import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useSelector } from 'react-redux'

const TabelRows = ({ _item }) => {
    console.log("_item: ", _item)
    const lang = useSelector(({ language }) => language.language)
    const { price, total_price, quantity, product } = _item ? _item : [0, 0, 0, null]
    const { ar_name, en_name } = product ? product : { ar_name: 'المنتج غير متاح', en_name: 'Product is not available' }
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    console.log("product: ", product)
    return (
        <View style={[styles.orderinfoRow, langView]}>
            <Text style={styles.tabelText}>{lang == 'ar' ? ar_name : en_name}</Text>
            <Text style={styles.tabelText}>{price}</Text>
            <Text style={styles.salaryText}>{quantity}</Text>
            <Text style={styles.tabelText}>{total_price}</Text>
        </View>
    )
}

export default TabelRows;