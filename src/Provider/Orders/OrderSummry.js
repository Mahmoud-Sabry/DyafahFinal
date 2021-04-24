import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import SummryRow from './SummryRow'
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';

const OrderSummry = ({ _order }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { total_price, taxs, delivery_fee, price } = _order ? _order : ['', '', '', '']
    return (
        <View style={styles.OrderSummryView}>
            <SummryRow _label={I18n.t('provider.orders.totalPrice')} _salary={price} />
            <SummryRow _label={I18n.t('provider.orders.taxs')} _salary={taxs} />
            <SummryRow _label={I18n.t('provider.orders.deliveryFee')} _salary={delivery_fee} />
            <View style={[styles.orderinfoRow, langView]}>
                <Text style={[styles.summryTotal, langText]}>{I18n.t('provider.orders.total')}</Text>
                <Text style={[styles.summryTotal, langText]}>{total_price}</Text>
                <Text style={[styles.summryTotal, langText]}>{I18n.t('provider.orders.sar')}</Text>
            </View>
        </View>
    )
}

export default OrderSummry;