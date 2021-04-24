import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { acceptOrder, getNewOrders } from '../../Redux/Slices/Worker/info';
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

const NewOrder = ({ item, _onPress, _onAccept, _onRefuse }) => {
    const { username, total_price, address, order_details, image } = item ? item : ['محمد محمود', '700', 'شارع تبوك حفرالباطن', null]
    const { day } = order_details ? order_details[0].dates[0] ? order_details[0].dates[0] : '2020/8/15' : '2020/8/15'
    const lang = useSelector(({ language }) => language.language)
    const langStyle = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = [styles.orderInfoText, { textAlign: lang == 'ar' ? 'right' : 'left' }]
    const url = image ? { uri: `${dyafah}${image}` } : require('../../assets/images/worker.png')
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
                    <Button _text={I18n.t('worker.orders.accept')} _color='#07A456' _onPress={_onAccept} />
                    <Button _text={I18n.t('worker.orders.refuse')} _color='#CE2727' _onPress={_onRefuse} />
                </View>
            </View>
            <Image source={url} style={styles.orderLocation} defaultSource={require('../../assets/images/logo.png')} />
        </TouchableOpacity>
    )
}

const NewOrders = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const user = useSelector(({ worker }) => worker.user)
    const newOrders = useSelector(({ worker }) => worker.newOrders)
    const newLoading = useSelector(({ worker }) => worker.newLoading)
    const dispatch = useDispatch()
    newOrders == null ? dispatch(getNewOrders({ token: user.api_token })) : null
    const notFound = newOrders ? newOrders.length > 0 ? false : true : true

    const _onAcceptRefuse = (order_id, action) => {
        const { api_token, type } = user
        console.log("_onAcceptRefuse: ", api_token, order_id, action, type)
        dispatch(acceptOrder({ api_token, order_id, action, type }))
    }

    const renderOrder = ({ item }) => {
        return (
            <NewOrder
                item={item}
                _onPress={() => props.navigation.navigate('NewDetails', { item })}
                _onAccept={() => _onAcceptRefuse(item.id, 'accepted')}
                _onRefuse={() => _onAcceptRefuse(item.id, 'refused')}
            />
        )
    }
    return (
        <View style={styles.ListStyle}>
            {newLoading && <Spinner size='large' color='#F47421' />}
            {!newLoading && notFound && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                key={'New'}
                data={newOrders ? newOrders : []}
                refreshing={false}
                onRefresh={() => dispatch(getNewOrders({ token: user.api_token }))}
                style={styles.ListStyle}
                keyExtractor={(item, index) => index}
                renderItem={(item) => renderOrder(item)}
            />
        </View>
    )
}

export default NewOrders

