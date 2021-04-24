import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import styles from './styles';
import { Icon, Spinner } from 'native-base';
import { dyafah } from '../../assets/consts';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Redux/Slices/Main/appUser';
import { addToFav } from '../../Redux/Slices/Main/appUser';
import ShowToast from '../../custom/Toast';

const CarItem = ({ item, navigation }) => {
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const favAdding = useSelector(({ appUser }) => appUser.favAdding)
    const dispatch = useDispatch()
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { id, ar_description, en_description, ar_name, en_name, rate, is_favourite, type, image, has_offer,
        offer_price, price } = item ? item :
            [0, '', '', 0, 0, '', '', 0, 0, 0]
    const [fav, setFav] = useState(is_favourite == 1)
    const GoToView = () => {
        const { api_token, role } = appUser ? appUser : [null, null]
        dispatch(getProductDetails({ api_token, id, role }))
        console.log("CarItem GoToView type: ", type)
        if (type == 'popular_eating' || type == 'kashta') {
            navigation.navigate('FoodItem')
        } else {
            navigation.navigate('WorkerView')
        }
    }

    const _onHeartPress = () => {
        const { api_token, role } = appUser ? appUser : [null, 'user']
        if (api_token != null) {
            dispatch(addToFav({ api_token, product_id: id, type: role }))
            setFav(!fav)
        } else ShowToast(I18n.t('profile.auth'), 'warning')
    }

    const defaultImage = require('../../assets/images/logo.png')

    return (
        <TouchableOpacity style={[styles.ItemContainer, langView]} onPress={() => GoToView()} >
            <Image
                source={{ uri: `${dyafah}${image}` }}
                style={lang == 'ar' ? styles.rightItemImage : styles.leftItemImage}
                defaultSource={defaultImage}
            />
            <View style={styles.ItemDetails}>
                {lang == 'en' && <Text style={[styles.Title, langText]}>{en_name ? en_name : ''}</Text>}
                {lang == 'ar' && <Text style={[styles.Title, langText]}>{ar_name ? ar_name : ''}</Text>}
                <Text style={[styles.ItemDescription, langText]}>
                    {lang == 'ar' ? ar_description : en_description}
                </Text>
                <View style={[styles.favRatingView, langView]}>
                    <StarRating
                        reversed={lang == 'ar'}
                        maxStars={5}
                        starSize={20}
                        rating={rate}
                        halfStarEnabled
                        disabled={false}
                        starStyle={styles.starsStyle}
                        containerStyle={styles.starsContainer}
                    />
                    <TouchableOpacity style={styles.heartButton} onPress={() => _onHeartPress()}>
                        <Icon type='AntDesign' name='heart' style={[styles.heartIcon, { color: fav ? '#F7901F' : '#ffffff' }]} />
                    </TouchableOpacity>
                </View>
                {has_offer == 1 && <Text style={[styles.itemSalary, langText]}>{I18n.t('searchFilter.price')} {offer_price} {I18n.t('provider.offers.insteadof')}
                    <Text style={[styles.itemSalary, langText, { textDecorationLine: 'line-through' }]}>
                        {price} {I18n.t('cart.sar')}
                    </Text>
                </Text>}
                {has_offer != 1 && <Text style={[styles.itemSalary, langText]}>{I18n.t('searchFilter.price')} {price} {I18n.t('cart.sar')}</Text>}
            </View>
        </TouchableOpacity>
    )
}

export default CarItem
