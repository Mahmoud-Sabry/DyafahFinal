import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import CountryCode from '../CountryCode'
import styles from './styles'

const PhoneCode = () => {
    const [source, setSource] = useState(require('../../assets/images/saudi.png'))
    const [code, setCode] = useState('+966')
    const [name, setName] = useState('SAU')
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={styles.phoneCodeView}>
            <TouchableOpacity style={styles.phoneCodeView} onPress={() => setModalVisible(true)}>
                <Image source={source} style={styles.flagImage} defaultSource={require('../../assets/images/logo.png')} />
                <Text style={styles.phoneLabel}>{name} {code}</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}>
                <CountryCode
                    OnPress={setModalVisible}
                    setSource={setSource}
                    setName={setName}
                    setCode={setCode}
                />
            </Modal>
        </View>
    )
}

export default PhoneCode
