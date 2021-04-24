import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n';


const WorkerTotalOrders = ({ _conut }) => {
    const orderTitle = _conut == 1 || _conut > 10 ? I18n.t('worker.home.order') : I18n.t('worker.home.orders')
    return (
        <View style={styles.totalOrdersView}>
            <Text style={styles.totalOrdersText}>{I18n.t('worker.home.totalOrders')} {_conut} {orderTitle}</Text>
        </View>
    )
}

export default WorkerTotalOrders
