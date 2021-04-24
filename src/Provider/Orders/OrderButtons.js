import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { acceptOrder } from '../../Redux/Slices/Provider/info'
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import I18n from '../../languages/I18n';

const OrderButton = ({ _text, _color, _onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.orderButton, { backgroundColor: _color }]}
            onPress={() => _onPress()}
        >
            <Text style={styles.orderButtonText}>{_text}</Text>
        </TouchableOpacity>
    )
}

const OrderButtons = ({ _order }) => {
    const provider = useSelector(({ provider }) => provider.provider)
    const ordersLoading = useSelector(({ provider }) => provider.ordersLoading)
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const dispatch = useDispatch()

    const _onAcceptPress = (action) => {
        const { api_token, type } = provider
        const order_id = _order.id
        dispatch(acceptOrder({ api_token, order_id, action, type }))
    }

    return (
        <View style={[styles.ordersView, langView]}>
            {ordersLoading && <Spinner size='large' color='#F47421' />}
            {!ordersLoading && <OrderButton _text={I18n.t('provider.orders.accept')} _color='#07A456' _onPress={() => _onAcceptPress('accepted')} />}
            {!ordersLoading && <OrderButton _text={I18n.t('provider.orders.refuse')} _color='#CE2727' _onPress={() => _onAcceptPress('refused')} />}
        </View>
    )
}

export default OrderButtons;