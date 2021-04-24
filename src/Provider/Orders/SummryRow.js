import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux'

const SummryRow = ({ _label, _salary }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }

    return (
        <View style={[styles.orderinfoRow, langView]}>
            <Text style={[styles.SummryText, langText]}>{_label}</Text>
            <Text style={[styles.SummryText, langText]}>{_salary}</Text>
            <Text style={[styles.SummryText, langText]}>{I18n.t('provider.orders.sar')}</Text>
        </View>
    )
}

export default SummryRow