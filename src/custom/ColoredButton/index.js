import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

const ColoredButton = ({ title, OnPress, ContStyle, TextStyle }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, ContStyle ? ContStyle : null]} onPress={OnPress}>
            <Text style={[styles.buttonText, TextStyle ? TextStyle : null]}>{title ? title : 'حجز'}</Text>
        </TouchableOpacity>
    )
}

export default ColoredButton
