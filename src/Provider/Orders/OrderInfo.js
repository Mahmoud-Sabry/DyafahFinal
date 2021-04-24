import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import InfoRow from './InfoRow'
import ProductsTabel from './ProductsTabel'
import TabelRows from './TabelRows'
import OrderSummry from './OrderSummry'
import OrderButtons from './OrderButtons'
import OrderStatus from './OrderStatus'
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux'

const OrderInfo = ({ _order, _OrderButtons, _OrderStatus }) => {
    console.log("Order Item: ", _order)
    const language = useSelector(({ language }) => language.language)
    const { username, phone, address, order_details } = _order ? _order : ['', '', '', []]
    return (
        <View style={styles.orderinfoView}>
            <InfoRow _label={I18n.t('provider.orders.name')} _text={username} />
            <InfoRow _label={I18n.t('provider.orders.phone')} _text={phone} />
            <InfoRow _label={I18n.t('provider.orders.address')} _text={address} />
            <ProductsTabel />
            <FlatList
                data={order_details}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TabelRows _item={item} />}
            />
            <OrderSummry _order={_order} />
            {_OrderButtons && <OrderButtons _order={_order} />}
            {_OrderStatus && <OrderStatus _order={_order} />}
        </View>
    )
}

export default OrderInfo