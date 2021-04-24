import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Picker, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { changeOrder } from '../../Redux/Slices/Provider/info';
import I18n from '../../languages/I18n';

const OrderStatus = ({ _order, _selected, _setSelected }) => {
    const { api_token, type } = useSelector(({ provider }) => provider.provider)
    const { changeLoading } = useSelector(({ provider }) => provider.changeLoading)
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const dispatch = useDispatch()
    const { id, status } = _order
    console.log("OrderStatus: ", type)

    const _onStatusChanged = (newStatus) => {
        dispatch(changeOrder({ api_token, order_id: id, newStatus }))
    }

    return (
        <View style={[styles.StatusView, langView]}>
            <Text style={styles.StatusText}>{I18n.t('provider.orders.orderStatus')}</Text>
            {changeLoading && <Spinner size='large' color='#F47421' />}
            {!changeLoading && <Picker
                mode="dropdown"
                style={styles.pickerContainer}
                textStyle={styles.pickerText}
                itemStyle={styles.pickerItem}
                itemTextStyle={styles.pickerItemText}
                selectedValue={status}
                onValueChange={(value) => _onStatusChanged(value)}
            >
                {/* <Picker.Item label={I18n.t('provider.orders.statuses.accepted')} value="accepted" /> */}
                <Picker.Item label={I18n.t('provider.orders.statuses.preparing')} value="preparing" />
                {type != 'places' && <Picker.Item label={I18n.t('provider.orders.statuses.onWay')} value="delivering" />}
                <Picker.Item label={I18n.t('provider.orders.statuses.finished')} value="complete" />
            </Picker>}
        </View>
    )
}
export default OrderStatus