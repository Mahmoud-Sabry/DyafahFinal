import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import { dyafah } from '../../assets/consts';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../Redux/Slices/Main/appUser';

const FoodItem = ({ item, OnPress }) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const { id, product_image, ar_name, en_name, place } = item ? item : [0, null, '', '', '']
    const image = product_image ? { uri: `${dyafah}${product_image.image}` } : null
    const _onItemPress = () => {
        let itemCart = null
        Cart.forEach(item => {
            if (item.product_id == id) {
                itemCart = item
            }
        });
        const { api_token, role } = appUser ? appUser : [null, null]
        dispatch(getProductDetails({ api_token, role, id }))
        OnPress('FoodItem')
    }
    return (
        <TouchableOpacity
            style={styles.itemView}
            onPress={() => _onItemPress()}
        >
            <Image
                // source={require('../../assets/images/bag.png')}
                source={image}
                style={styles.itemImage}
            />
            <Text style={styles.itemName}>{lang == 'ar' ? ar_name : en_name}</Text>
            <View style={styles.itemPlaceView}>
                <Text style={styles.itemPlaceText}>{place}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FoodItem
