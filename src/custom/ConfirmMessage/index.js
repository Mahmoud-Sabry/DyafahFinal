import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './styles'
import BillMessage from '../BillMessage'
import I18n from '../../languages/I18n'
import { useInterval } from '../useInterval'
import { useSelector } from 'react-redux'

const ConfirmMessage = ({ OnPress, goBack }) => {
    const user = useSelector(({ appUser }) => appUser.appUser)
    console.log("ConfirmMessage user: ", user)
    const [modalVisible, setModalVisible] = useState(false);
    const _onClose = () => {
        if (user.role != 'provider') {
            goBack();
            goBack();
        }
        goBack();
        goBack();
        goBack();
        goBack();
        goBack();
        OnPress(false);
    }
    // useInterval(() => {
    //     // OnPress(false);
    //     // goBack();
    //     // goBack();
    //     if (user.role != 'provider') {
    //         goBack();
    //         goBack();
    //     }
    //     goBack();
    // }, 500);

    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => _onClose()}>
                <Text style={styles.confirmTitle}>{I18n.t('cart.orderFinished')}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.reviewText}>{I18n.t('cart.reviewInvoice')}</Text>
                </TouchableOpacity>
                {/* Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    onRequestClose={() => setModalVisible(false)}>
                    <BillMessage OnPress={setModalVisible} />
                </Modal>
            </TouchableOpacity>
        </View>
    )
}

export default ConfirmMessage
