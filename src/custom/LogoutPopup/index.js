import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../languages/I18n'

const ConfirmMessage = ({ OnPress, _onConfirm }) => {
    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => OnPress(false)}>
                <Text style={styles.questionText}>{I18n.t('drawer.logoutAsk')}</Text>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => _onConfirm()}>
                        <Text style={styles.confirmText}>{I18n.t('drawer.confirm')}</Text>
                    </TouchableOpacity>
                    <LinearGradient style={styles.cancelButton} colors={['#FE9C31', '#F47421']} >
                        <TouchableOpacity onPress={() => OnPress(false)}>
                            <Text style={styles.cancelText}>{I18n.t('drawer.cancel')}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ConfirmMessage
