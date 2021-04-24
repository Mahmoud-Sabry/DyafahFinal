import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import styles from './styles';
import StarRating from 'react-native-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../../languages/I18n';
import { getCompletedOrders } from '../../Redux/Slices/Worker/info';
import { Spinner } from 'native-base';
import { dyafah } from '../../assets/consts';


const StarComp = ({ _maxStars, _starSize, _rating, _starStyle, _containerStyle, _selectedStar }) => {
    const lang = useSelector(({ language }) => language.language)
    const [stars, setStars] = useState(3.5);
    return (
        <StarRating
            reversed={lang == 'ar' ? true : false}
            maxStars={_maxStars ? _maxStars : 5}
            starSize={_starSize ? _starSize : 25}
            rating={_rating ? _rating : stars}
            halfStarEnabled
            disabled={false}
            starStyle={_starStyle ? _starStyle : styles.starsStyle}
            containerStyle={_containerStyle ? _containerStyle : styles.starsContainer}
            selectedStar={(rating) => _selectedStar ? _selectedStar(rating) : setStars(rating)}
        />
    )
}

const FinishedOrder = ({ item, _onPress }) => {
    const lang = useSelector(({ language }) => language.language)
    const { username, total_price, address, order_details, image } = item ? item : ['محمد محمود', '700', 'شارع تبوك حفرالباطن', null]
    const { day } = order_details ? order_details[0].dates[0] ? order_details[0].dates[0] : '2020/8/15' : '2020/8/15'
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
                    <Text style={langText}>{I18n.t('worker.orders.rate')}</Text>
                    <StarComp _starSize={15} />
                </View>
                <View style={[styles.orderInfoRow, langStyle]}>
                    <Text style={styles.orderInfoText}>{I18n.t('worker.orders.date')}</Text>
                    <Text style={styles.orderDetailText} >{day}</Text>
                </View>
            </View>
            <Image source={url} style={styles.orderLocation} defaultSource={require('../../assets/images/logo.png')} />
        </TouchableOpacity>
    )
}

const Finished = (props) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ worker }) => worker.user)
    const completedOrders = useSelector(({ worker }) => worker.completedOrders)
    const completedLoading = useSelector(({ worker }) => worker.completedLoading)
    completedOrders ? null : dispatch(getCompletedOrders({ token: api_token }))
    const notFound = completedOrders ? completedOrders.length > 0 ? false : true : true

    const renderOrder = ({ item }) => {
        return (
            <FinishedOrder
                item={item}
                _onPress={() => props.navigation.navigate('FinishedDetails', { item })}
            />
        )
    }
    return (
        <View style={styles.ListStyle}>
            {completedLoading && <Spinner size='large' color='#F47421' />}
            {!completedLoading && notFound && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                key={'finished'}
                refreshing={false}
                onRefresh={() => dispatch(getCompletedOrders({ token: api_token }))}
                data={completedOrders ? completedOrders : []}
                style={styles.ListStyle}
                keyExtractor={(item, index) => index}
                renderItem={(item) => renderOrder(item)}
            />
        </View>
    )
}

export default Finished

