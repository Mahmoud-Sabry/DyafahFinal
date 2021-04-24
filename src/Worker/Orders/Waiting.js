import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { changeOrder, getWaitingOrders } from '../../Redux/Slices/Worker/info';
import I18n from '../../languages/I18n';
import { Spinner } from 'native-base';
import { dyafah } from '../../assets/consts';

const Button = ({ _color, _text, _onPress }) => {
    return (
        <TouchableOpacity onPress={() => _onPress()} style={[styles.button, { backgroundColor: _color }]} >
            <Text style={styles.buttonText}>{_text}</Text>
        </TouchableOpacity>
    )
}

const WaitingOrder = ({ item, _onPress, _onFinish }) => {
    const lang = useSelector(({ language }) => language.language)
    const { username, total_price, address, order_details, image } = item ? item : ['محمد محمود', '700', 'شارع تبوك حفرالباطن', null]
    const { day } = order_details ? order_details[0].dates[0] ? order_details[0].dates[0] : '2020/3/15' : '2020/3/15'
    const url = image ? { uri: `${dyafah}${image}` } : require('../../assets/images/worker.png')
    const langStyle = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = [styles.orderInfoText, { textAlign: lang == 'ar' ? 'right' : 'left' }]
    return (
        <TouchableOpacity
            style={[styles.orderContainer, langStyle]}
            onPress={() => _onPress ? _onPress() : null}
        >
            <View style={styles.orderDetails}>
                <View style={[styles.orderInfoRow, langStyle]}>
                    <Text style={langText}>{I18n.t('worker.orders.name')}</Text>
                    <Text style={styles.orderDetailText} >{username}</Text>
                </View>
                <View style={[styles.orderInfoRow, langStyle]}>
                    <Text style={langText}>{I18n.t('worker.orders.price')}</Text>
                    <Text style={styles.orderDetailText} >{total_price} ريال</Text>
                </View>
                <View style={[styles.orderInfoRow, langStyle]}>
                    <Text style={langText}>{I18n.t('worker.orders.address')}</Text>
                    <Text style={styles.orderDetailText} >{address}</Text>
                </View>
                <View style={[styles.orderInfoRow, langStyle]}>
                    <Text style={styles.orderInfoText}>{I18n.t('worker.orders.date')}</Text>
                    <Text style={styles.orderDetailText} >{day}</Text>
                </View>
                <View style={styles.orderInfoRow}>
                    <Button _text={I18n.t('worker.orders.finishOrder')} _color='#07A456' _onPress={_onFinish} />
                </View>
            </View>
            <Image source={url} style={styles.orderLocation} defaultSource={require('../../assets/images/logo.png')} />
        </TouchableOpacity>
    )
}

const Waiting = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const user = useSelector(({ worker }) => worker.user)
    const waitingOrders = useSelector(({ worker }) => worker.waitingOrders)
    const waitingLoading = useSelector(({ worker }) => worker.waitingLoading)
    const dispatch = useDispatch()
    waitingOrders ? null : dispatch(getWaitingOrders({ token: user.api_token }))
    const notFound = waitingOrders ? waitingOrders.length > 0 ? false : true : true

    const _onFinishPress = (order_id) => {
        const { api_token } = user
        dispatch(changeOrder({ api_token, order_id }))
    }

    const renderOrder = ({ item }) => {
        return (
            <WaitingOrder
                item={item}
                _onPress={() => props.navigation.navigate('WaitingDetails', { item })}
                _onFinish={() => _onFinishPress(item.id)}
            />
        )
    }
    return (
        <View style={styles.ListStyle}>
            {waitingLoading && <Spinner size='large' color='#F47421' />}
            {!waitingLoading && notFound && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                key={'waiting'}
                data={waitingOrders ? waitingOrders : []}
                refreshing={false}
                onRefresh={() => dispatch(getWaitingOrders({ token: user.api_token }))}
                style={styles.ListStyle}
                keyExtractor={(item, index) => index}
                renderItem={(item) => renderOrder(item)}
            />
        </View>
    )
}

export default Waiting
