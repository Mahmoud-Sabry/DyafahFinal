import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from './styles';
import { RadioGroup } from 'react-native-btr';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import I18n from '../../languages/I18n'

const RenderItem = ({ item, _onPress }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <TouchableOpacity style={[styles.radioButton, langView]} onPress={() => _onPress()}>
            <Icon type='FontAwesome'
                name={item.checked ? 'dot-circle-o' : 'circle-o'}
                color='#64615E' style={styles.radioIcon}
            />
            <Text style={[styles.radioLabels, langText]}>
                {I18n.t(`${item.label}`)}
                {/* {item.label} */}
            </Text>
        </TouchableOpacity>
    )
}

const Question = ({ data, set, title, value, setVal }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const _onRadioPressed = (val) => {
        setVal ? setVal(val) : null
        let rbs = []
        data.forEach((item) => {
            item.value == val ? rbs.push({ ...item, checked: true }) : rbs.push({ ...item, checked: false })
        })
        set(rbs)
    }
    return (
        <View style={styles.QuestionContainer}>
            < Text style={[styles.itemInfoTitle, langText]} >{title ? title : 'No Title'}</Text >
            <FlatList
                key={'QuestionList'}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <RenderItem item={item} _onPress={() => _onRadioPressed(item.value)} />}
            />
        </View>
    )
}

export default Question
