import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Icon } from 'native-base'
import I18n from '../../languages/I18n'

const DateItem = ({ item, _onDayPress }) => {
    let day = { text: '', hint: '', color: '', iconName: '' }
    if (item.status === 'available') {
        day = {
            text: I18n.t('product.dates.pickToday'),
            hint: I18n.t('product.available'),
            color: '#35A840',
            iconName: 'check'
        }
    }
    else if (item.status === 'choosen') {
        day = {
            text: I18n.t('product.dates.pickedDay'),
            hint: I18n.t('product.choosen'),
            color: '#f6f578',
            iconName: 'check'
        }
    }
    else {
        day = {
            text: I18n.t('product.dates.dayPicked'),
            hint: I18n.t('product.reserved'),
            color: '#ff5733',
            iconName: 'cross'
        }
    }

    const _onDayPressed = () => {
        _setDate(item.day)
        console.log("Day Pressed: ", item)
    }

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => _onDayPress()}>
            <View style={styles.itemPart1}>
                <Text style={styles.dayTextStyle}>{day.text}</Text>
            </View>
            <View style={styles.itemPart1}>
                <View style={[styles.iconView, { backgroundColor: day.color }]}>
                    <Icon type='Entypo' name={day.iconName} style={styles.itemIcon} />
                </View>
                <Text style={styles.dayTextStyle}>{day.hint}</Text>
            </View>
            <View style={styles.itemPart3}>
                <Text style={styles.dayTextStyle}>{item.day}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DateItem
