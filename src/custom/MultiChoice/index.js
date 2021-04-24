import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Picker } from 'native-base';
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux'

const MultiChoice = ({ _label, _selected, _setSelected, _choices }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }

    let multiChoice = _choices.map((item, index) => {
        return <Picker.Item
            key={item.id}
            value={item.id}
            label={lang == 'ar' ? item.ar_name : item.en_name}
        />
    })
    return (
        <View style={[styles.StatusView, langView]}>
            <Text style={styles.StatusText}>{_label}</Text>
            <Picker
                mode="dropdown"
                style={{ width: 120 }}
                textStyle={styles.pickerText}
                itemStyle={styles.pickerItem}
                itemTextStyle={styles.pickerItemText}
                selectedValue={_selected}
                onValueChange={(value) => _setSelected(value)}
            >
                {multiChoice}
            </Picker>
        </View>
    )
}

export default MultiChoice