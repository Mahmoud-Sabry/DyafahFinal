import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styles from './styles';

const ProgressLine = () => {

    const [press1, setPress1] = useState(false);
    const [press2, setPress2] = useState(false);
    const color1 = press1 ? '#F7901F' : '#BCBCBC';
    const color2 = press2 ? '#F7901F' : '#BCBCBC';

    return (
        <View style={styles.progressLineView}>
            <TouchableOpacity style={[styles.progressCircle, { backgroundColor: '#F7901F' }]} />
            <View style={[styles.progressLine, { backgroundColor: color1 }]} />
            <TouchableOpacity
                style={[styles.progressCircle, { backgroundColor: color1 }]}
                onPress={() => {
                    setPress1(!press1)
                    press2 ? setPress2(false) : null
                }}
            />
            <View style={[styles.progressLine, { backgroundColor: color2 }]} />
            <TouchableOpacity
                style={[styles.progressCircle, { backgroundColor: color2 }]}
                onPress={() => {
                    setPress2(!press2)
                    press1 ? null : setPress1(true)
                }}
            />
        </View>
    )
}

export default ProgressLine
