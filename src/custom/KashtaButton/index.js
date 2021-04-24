import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import I18n from '../../languages/I18n';
import styles from './styles';

const KashtaButton = ({ title, OnPress }) => {
    return (
        <TouchableOpacity style={styles.ButtonContainer} onPress={() => OnPress()} >
            {/* {I18n.t('search')} */}
            <Text style={styles.ButtonText}>{title ? title : 'no title'}</Text>
        </TouchableOpacity>
    )
}

export default KashtaButton
