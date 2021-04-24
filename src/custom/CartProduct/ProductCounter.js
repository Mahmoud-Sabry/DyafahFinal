import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles';
import { Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails, gotCartDetails, setAsyncCart, setProductDetails, setUserCart } from '../../Redux/Slices/Main/appUser';

const ProductCounter = ({ _product, _quantity }) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(({ appUser }) => appUser.productDetails)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const { id } = _product
    console.log("id: ", id)

    const _onIncrease = () => {
        let found = false
        let newCart = []
        Cart.forEach(item => {
            if (item.product_id == id) {
                found = true
                newCart.push({ product_id: id, quantity: _quantity + 1, dates: "" })
            } else newCart.push(item)
        })
        found ? null : newCart.push({ product_id: id, quantity: _quantity + 1, dates: "" })
        dispatch(getCartDetails({ cart: newCart }))
        dispatch(setUserCart(newCart))
        productDetails ? dispatch(setProductDetails({ product: productDetails })) : null
        dispatch(setAsyncCart(newCart))
    }

    const _onDecrease = () => {
        let found = false
        let newCart = []
        Cart.forEach(item => {
            if (item.product_id == id) {
                found = true
            } else newCart.push(item)
        })
        if (found) {
            if (_quantity == 1) {
                dispatch(getCartDetails({ cart: newCart }))
                dispatch(setUserCart(newCart))
                productDetails ? dispatch(setProductDetails({ product: productDetails })) : null
                dispatch(setAsyncCart(newCart))
            } else if (_quantity > 1) {
                newCart = [...newCart, { product_id: id, quantity: _quantity - 1, dates: "" }]
                dispatch(getCartDetails({ cart: newCart }))
                dispatch(setUserCart(newCart))
                productDetails ? dispatch(setProductDetails({ product: productDetails })) : null
                dispatch(setAsyncCart(newCart))
            }
        }
    }

    return (
        <View style={styles.counterContainer}>
            <TouchableOpacity onPress={() => _onIncrease()} >
                <Icon type='AntDesign' name='plus' style={styles.counterIcon} />
            </TouchableOpacity>
            <Text style={styles.counterText}>{_quantity}</Text>
            <TouchableOpacity onPress={() => _onDecrease()} >
                <Icon type='AntDesign' name='minus' style={styles.counterIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default ProductCounter;