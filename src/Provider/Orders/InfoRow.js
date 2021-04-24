import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { useSelector } from 'react-redux'

const InfoRow = ({ _label, _text }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[styles.orderinfoRow, langView]}>
            <Text style={[styles.orderinfoLabel, langText]}>{_label}</Text>
            <Text style={[styles.orderinfoText, langText]}>{_text}</Text>
        </View>
    )
}

export default InfoRow;