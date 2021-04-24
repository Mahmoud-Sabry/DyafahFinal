import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n';


const ShowOrdersButton = ({ OnPress }) => {
    return (
        <TouchableOpacity
            style={styles.totalOrdersView}
            onPress={() => OnPress ? OnPress() : null}
        >
            <Text style={styles.totalOrdersText}>{I18n.t('worker.home.showPastOrders')}</Text>
        </TouchableOpacity>
    )
}

export default ShowOrdersButton
