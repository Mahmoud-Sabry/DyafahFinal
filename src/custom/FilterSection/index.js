import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import ColoredButton from '../ColoredButton';
import BorderdButton from '../BorderdButton';
import styles from './styles';

const Button = ({ item, value, _onPress }) => {
    const [pressed, setPress] = useState(false);
    return (
        <View >
            {value == item.value &&
                <ColoredButton
                    title={item.title}
                    ContStyle={styles.buttonContainer}
                    TextStyle={styles.TextStyle}
                    OnPress={() => _onPress()} //setPress(false)}
                />}
            {value != item.value &&
                <BorderdButton
                    title={item.title}
                    ContStyle={styles.buttonContainer}
                    TextStyle={styles.TextStyle}
                    OnPress={() => _onPress()} //setPress(true)}
                />}
        </View>
    )
}




const FilterSection = ({ title, buttons, value, setValue }) => {

    const _onPress = (val) => {
        setValue ? setValue(val) : null
    }

    return (
        <View>
            <Text style={styles.titleText}>{title}</Text>
            {buttons && <FlatList
                data={buttons}
                renderItem={({ item, index }) =>
                    <Button item={item}
                        value={value}
                        _onPress={() => _onPress(item.value)} />}
                keyExtractor={(item, index) => index}
            // style={styles.ListStyle}
            />}
        </View>
    )
}

export default FilterSection
