import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import StarRating from 'react-native-star-rating';
import PlacesAds from '../../custom/Ads';
import styles from './styles';
import FoodList from '../../custom/FoodList'
import ProductCounter from '../../custom/CartProduct/ProductCounter';
import { Icon, Spinner } from 'native-base';
import Shops from './Shops';
import { useDispatch, useSelector } from 'react-redux';
import { dyafah } from '../../assets/consts';
import I18n from '../../languages/I18n';
import { getProductDetails, setProductDetails } from '../../Redux/Slices/Main/appUser';
import { addToFav, getAsyncCart, setAsyncCart, setUserCart } from '../../Redux/Slices/Main/appUser';
import ShowToast from '../../custom/Toast';

const ItemDetails = ({ props }) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const favAdding = useSelector(({ appUser }) => appUser.favAdding)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const productDetails = useSelector(({ appUser }) => appUser.productDetails)
    const detailsLoading = useSelector(({ appUser }) => appUser.detailsLoading)
    const kashtaProducts = useSelector(({ home }) => home.kashtaProducts)
    const popularEatings = useSelector(({ home }) => home.popularEatings)
    const { product, provider, similarProducts, quantity, cart } = productDetails ?
        productDetails : [null, [], [], 1, false]
    const {
        id, category_id, type, ar_name, en_name, ar_description, en_description, has_offer, is_favourite,
        offer_price, ar_offer_description, offer_description, price, rate, details, images, sales
    } = product ? product : [0, 0, 'type', '', '', 0, 0, '', 0, 0, [], [], 0]
    let imagesList = []
    const [fav, setFav] = useState(is_favourite == 1)
    const [count, setCount] = useState(quantity)
    count != quantity ? setCount(quantity) : null

    async function _onPrevPressed() {
        let array = type == 'kashta' ? [...kashtaProducts] : [...popularEatings]
        let count = false
        let index = false
        await array.forEach(item => {
            if (item.id == category_id) {
                array = [...item.products]
            }
        })
        array.forEach(item => {
            if (item.id == id) {
                index = count
            }
            count = item.id
        })
        if (index != false) {
            const { api_token, role } = appUser ? appUser : [null, null]
            dispatch(getProductDetails({ id: index, api_token, role }))
            navigate('FoodItem')
        }
        console.log('Index of Prev Product: ', index)
    }

    async function _onNextPressed() {
        let array = type == 'kashta' ? [...kashtaProducts] : [...popularEatings]
        let count = false
        let index = false
        await array.forEach(item => {
            if (item.id == category_id) {
                array = [...item.products]
            }
        })
        await array.forEach(item => {
            index = count == true ? item.id : index
            count = item.id == id ? true : false
        })
        if (index != false) {
            const { api_token, role } = appUser ? appUser : [null, null]
            dispatch(getProductDetails({ id: index, api_token, role }))
            navigate('FoodItem')
        }
        console.log('Index of Next Product: ', index)
    }

    const _onHeartPress = () => {
        const { api_token, role } = appUser ? appUser : [null, 'user']
        if (api_token != null) {
            dispatch(addToFav({ api_token, product_id: id, type: role }))
            setFav(!fav)
        } else ShowToast(I18n.t('profile.auth'), 'warning')
    }

    const _onCartPress = () => {
        let found = false
        let newCart = []
        Cart.forEach(item => {
            if (item.product_id == id) {
                found = true
            } else newCart.push(item)
        })
        if (found) {
            // delete this item from cart and set it.
            dispatch(setUserCart(newCart))
            dispatch(setAsyncCart(newCart))
            dispatch(setProductDetails({ product: productDetails }))
            // setCart(!cart)
        } else {
            // add this item to cart and set it
            newCart = [...newCart, { product_id: id, quantity: count, dates: "" }]
            dispatch(setUserCart(newCart))
            dispatch(setAsyncCart(newCart))
            dispatch(setProductDetails({ product: productDetails }))
            // setCart(!cart)
        }
    }

    if (images) {
        images.forEach(image => {
            imagesList.push({ id: image.id, url: `${dyafah}${image.image}` })
        })
    }
    if (detailsLoading) {
        return (
            <Spinner size='large' color='#F47421' />
        )
    } else return (
        <ScrollView style={styles.ScrollContainer}>
            <PlacesAds custStyle={styles.adsStyles} DataSource={imagesList} />
            <View style={styles.nameView}>
                <Text style={[styles.nameText, langText]}>{lang == 'ar' ? ar_name : en_name}</Text>
                <StarRating
                    reversed
                    maxStars={5}
                    starSize={25}
                    rating={rate}
                    halfStarEnabled
                    disabled={false}
                    starStyle={styles.starsStyle}
                    containerStyle={styles.starsContainer}
                />
            </View>
            <View style={styles.itemInfoView}>
                {sales == 0 && <Text style={[styles.hintLabel, langText]}>{I18n.t('product.beFirst')}</Text>}
                {has_offer == 1 && <Text style={[styles.itemCost, langText]}>{offer_price} {I18n.t('provider.offers.insteadof')}
                    <Text style={[styles.itemCost, langText, { textDecorationLine: 'line-through' }]}>
                        {price} {I18n.t('cart.sar')}
                    </Text>
                </Text>}
                {has_offer == 1 && <Text style={[styles.itemCost, langText]}>{lang == 'ar' ? ar_offer_description : offer_description}</Text>}
                {has_offer == 0 && <Text style={[styles.itemCost, langText]}>{price} {I18n.t('cart.sar')}
                </Text>}
                <Text style={[styles.itemAvailable, langText]}>{I18n.t('product.avaNow')}</Text>
                <Text style={[styles.itemInfoText, langText]}>{lang == 'ar' ? ar_description : en_description}</Text>
                <FlatList
                    key={'ProductDetailsList'}
                    data={details}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Text style={[styles.itemInfoText, langText]}>{item.value}</Text>}
                />
                <View style={styles.counterView}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => _onHeartPress()}>
                        {favAdding && <Spinner size='small' color='#F47421' />}
                        {!favAdding && <Icon
                            type='AntDesign' name='heart'
                            style={[styles.itemIcon, { color: fav ? '#F7901F' : '#ffffff' }]}
                        />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => _onCartPress()}>
                        <Icon
                            type='FontAwesome' name='shopping-cart'
                            style={[styles.itemIcon, { color: cart ? '#F7901F' : '#ffffff' }]}
                        />
                    </TouchableOpacity>
                    <ProductCounter _product={product} _quantity={quantity} />
                </View>
                <View style={styles.arrowView}>
                    <TouchableOpacity style={styles.arrowButton} onPress={() => _onPrevPressed()}>
                        <Icon type='AntDesign' name='left' style={styles.arrowIcons} />
                    </TouchableOpacity>
                    <View style={styles.verticatLine} />
                    <TouchableOpacity style={styles.arrowButton} onPress={() => _onNextPressed()}>
                        <Icon type='AntDesign' name='right' style={styles.arrowIcons} />
                    </TouchableOpacity>
                </View>
            </View>
            {similarProducts.length > 0 && <View style={styles.semiProducts}>
                <FoodList listData={similarProducts ? [...similarProducts] : []} numCols={2} name={I18n.t('product.simiProducts')} OnPress={() => navigate} />
            </View>}
            {provider.length > 0 && <Shops _shops={[...provider]} />}
        </ScrollView>
    )
}

export default ItemDetails
