import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles';
import ProductCounter from './ProductCounter';
import { Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails, setAsyncCart, setUserCart } from '../../Redux/Slices/Main/appUser';
import { dyafah } from '../../assets/consts'
import I18n from '../../languages/I18n'

const CartProduct = ({ _item, _quantity }) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const { id, ar_name, en_name, ar_description, en_description, quantity, price, product_image } = _item
    const image = product_image ? { uri: `${dyafah}${product_image.image}` } : require('../../assets/images/kapsa.png')

    const _deleteItem = () => {
        let found = false
        let newCart = []
        Cart.forEach(item => {
            if (item.product_id == id) {
                found = true
            } else newCart.push(item)
        })
        dispatch(getCartDetails({ cart: newCart }))
        dispatch(setUserCart(newCart))
        dispatch(setAsyncCart(newCart))
    }

    return (
        <View style={styles.productContainer}>
            <Image
                source={image}
                style={styles.productImage}
            />
            <View style={styles.productInfoView}>
                <Text style={styles.productName}>{lang == 'ar' ? ar_name : en_name}</Text>
                <Text style={styles.productName}>{lang == 'ar' ? ar_description : en_description}</Text>
                <ProductCounter _product={_item} _quantity={quantity} />
                <Text style={styles.productCost}>{I18n.t('cart.cost')} {price} {I18n.t('cart.sar')}</Text>
            </View>
            <TouchableOpacity onPress={() => _deleteItem()}>
                <Icon type='AntDesign' name='close' style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default CartProduct
