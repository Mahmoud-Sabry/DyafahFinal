import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import styles from './styles';
import { Icon } from 'native-base';
import { dyafah } from '../../assets/consts';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Redux/Slices/Main/appUser';
import { addToFav } from '../../Redux/Slices/Main/appUser';
import ShowToast from '../../custom/Toast';

const Worker = ({ item, navigate }) => {
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const favAdding = useSelector(({ appUser }) => appUser.favAdding)
    const dispatch = useDispatch()
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const {
        id, ar_name, en_name, image, rate, price,
        has_offer, offer_price, is_favourite, type
    } = item ? item : ['name', 'description', null, 0, 0, 0, 0, 0]
    const imageStyle = lang == 'ar' ? styles.rightItemImage : styles.leftItemImage
    const uri = image ? { uri: `${dyafah}${image}` } : require('../../assets/images/worker.png')
    const workerType = type == 'chef' ? I18n.t('providerAuth.chef') : I18n.t('providerAuth.cofee')
    const [pressed, setPressed] = useState(is_favourite != 0)

    const _onItemPressed = () => {
        const { api_token, role } = appUser ? appUser : [null, null]
        dispatch(getProductDetails({ id, api_token, role }))
        navigate('WorkerView')
    }

    const _onHeartPress = () => {
        const { api_token, role } = appUser ? appUser : [null, 'user']
        if (api_token != null) {
            dispatch(addToFav({ api_token, product_id: id, type: role }))
            setPressed(!pressed)
        } else ShowToast(I18n.t('profile.auth'), 'warning')
    }

    return (
        <TouchableOpacity style={[styles.ItemContainer, langView]} onPress={() => _onItemPressed()} >
            <Image source={uri} style={imageStyle} defaultSource={require('../../assets/images/logo.png')} />
            <View style={styles.ItemDetails}>
                <Text style={[styles.Title, langText]}>{lang == 'ar' ? ar_name : en_name}</Text>
                <Text style={[styles.ItemDescription, langText]}>{workerType}</Text>
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
                        <Icon type='AntDesign' name='heart' style={[styles.heartIcon, { color: pressed ? '#F7901F' : '#ffffff' }]} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.itemSalary, langText]}>{I18n.t('searchFilter.price')} {price} {I18n.t('cart.sar')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Worker
