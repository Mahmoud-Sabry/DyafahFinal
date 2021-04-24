import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';

const drawerItem = ({ title, iconName, iconType, OnPress }) => {
    return (
        <TouchableOpacity style={styles.itemStyle} onPress={OnPress}>
            <View style={styles.iconBorder}>
                <Icon type={iconType} name={iconName} style={styles.iconStyle} />
            </View>
            <Text style={styles.labelItemStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default drawerItem
