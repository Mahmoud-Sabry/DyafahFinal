import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import { rateOrder } from '../../Redux/Slices/Main/appUser';

const OrderItem = ({ item, navigation, _onPress }) => {
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langLine = lang == 'ar' ? styles.leftLine : styles.rightLine
    const { date, id, total_price, rate } = item ? item : ['', 0, 0, 0]
    const dispatch = useDispatch()

    const GoToView = () => {
        _onPress()
        navigation.navigate('OrderView', { order_id: id })
    }

    const _onRating = (rate, order_id) => {
        console.log('_onRating: ', rate, ' ', order_id)
        dispatch(rateOrder({ api_token, rate, order_id }))
    }

    return (
        <TouchableOpacity style={[styles.ItemContainer, langView]} onPress={() => GoToView()}>
            <View style={[styles.labelsView, langLine]}>
                <Text style={styles.labelText}>{I18n.t('lastOrders.orderNum')}</Text>
                <Text style={styles.labelText}>{I18n.t('lastOrders.orderDate')}</Text>
                <Text style={styles.labelText}>{I18n.t('lastOrders.rate')}</Text>
                <Text style={styles.labelText}>{I18n.t('lastOrders.totalPrice')}</Text>
            </View>
            <View style={styles.ItemDetails}>
                <Text style={[styles.Title, langText]}>{id}</Text>
                <Text style={[styles.ItemDescription, langText]}>{date}</Text>
                <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={21}
                    rating={rate}
                    halfStarEnabled
                    disabled
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, { alignSelf: lang == 'ar' ? 'flex-end' : 'flex-start' }]}
                // selectedStar={(rating) => _onRating(rating, id)}
                />
                <Text style={[styles.Title, langText]}>{total_price} {I18n.t('lastOrders.sar')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem
