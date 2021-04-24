import { Icon } from 'native-base'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux'

const BackButton = ({ navigation, style }) => {
    const lang = useSelector(({ language }) => language.language)
    const langMargin = { marginTop: lang == 'ar' ? -10 : -3 }
    const _goBack = () => {
        let canGoBack = navigation.canGoBack()
        if (canGoBack) {
            navigation.goBack()
        }
    }

    return (
        <View style={[{ top: -90, left: 10 }, style]} >
            <TouchableOpacity style={styles.backContainer} onPress={() => _goBack()} >
                <Icon name="arrow-left" type="SimpleLineIcons" style={styles.backIcon} />
                <Text style={[styles.backText, langMargin]}>{I18n.t('drawer.back')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BackButton
