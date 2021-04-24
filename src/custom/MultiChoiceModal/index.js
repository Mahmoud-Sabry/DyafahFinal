import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './styles'
import RateModal from './RateModal'
import I18n from '../../languages/I18n'

const MultiChoiceModal = ({ OnPress, _onGoPress, _onRate, _id, _orderType }) => {
    // popular_eating
    const reOrderText = (_orderType == 'kashta' || _orderType == 'popular_eating')
    console.log("reOrderText: ", reOrderText)
    const [modalVisible, setModalVisible] = useState(false)
    const _goToProductPage = () => {
        OnPress(false)
        _onGoPress()
    }

    return (
        <View style={styles.popView}>
            <TouchableOpacity style={styles.messageContainer} onPress={() => OnPress(false)}>
                <TouchableOpacity onPress={() => _goToProductPage()}>
                    {reOrderText && <Text style={styles.confirmTitle}>{I18n.t('product.goToService')}</Text>}
                    {!reOrderText && <Text style={styles.confirmTitle}>{I18n.t('product.goToProduct')}</Text>}
                </TouchableOpacity>
                {_onRate != null && <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.confirmTitle}>{I18n.t('product.evaluateProduct')}</Text>
                </TouchableOpacity>}
                {/* Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    onRequestClose={() => setModalVisible(false)}>
                    <RateModal OnPress={setModalVisible} _onRate={_onRate} _id={_id} />
                </Modal>
            </TouchableOpacity>
        </View>
    )
}

export default MultiChoiceModal