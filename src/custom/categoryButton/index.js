import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CategoryButton = ({ props, title, path, OnPress }) => {
    const { navigation } = props;
    return (
        <TouchableOpacity style={styles.CategoryContainer} onPress={OnPress ? OnPress : null}>
            <Image source={path ? path : require('../../assets/images/car.png')} style={styles.CategoryImage} defaultSource={require('../../assets/images/logo.png')} />
            <View style={styles.lineView} />
            <Text style={styles.CategoryText}>{title ? title : ''}</Text>
        </TouchableOpacity>
    )
}

export default CategoryButton
