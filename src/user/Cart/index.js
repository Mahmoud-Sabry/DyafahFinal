import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, FlatList, ScrollView } from 'react-native'
import styles from './styles';
import Header from '../../custom/header';
import CartProduct from '../../custom/CartProduct';
import ColoredButton from '../../custom/ColoredButton';
import I18n from '../../languages/I18n';
import { getCartDetails, setAsyncCart, setUserCart } from '../../Redux/Slices/Main/appUser';
import { Spinner } from 'native-base';

const InfoRow = ({ lang, Title, Cost, Tag }) => {
    const { infoRow } = styles
    const ViewStyle = lang == 'ar' ? infoRow : [infoRow, { flexDirection: 'row' }]
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={ViewStyle}>
            <Text style={[styles.infoTitle, langText]}>{Title}</Text>
            <Text style={styles.infoCost}>{Cost}</Text>
            <Text style={styles.infoTag}>{Tag}</Text>
        </View>
    )
}
const InfoTotal = ({ lang, Title, Cost, Tag }) => {
    const { infoRow } = styles
    const ViewStyle = lang == 'ar' ? infoRow : [infoRow, { flexDirection: 'row' }]
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={ViewStyle}>
            <Text style={[styles.infoTotalTitle, langText]}>{Title}</Text>
            <Text style={styles.infoTotalCost}>{Cost}</Text>
            <Text style={styles.infoTotalTag}>{Tag}</Text>
        </View>
    )
}

const Cart = (props) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const lang = useSelector(({ language }) => language.language)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const gettingCart = useSelector(({ appUser }) => appUser.gettingCart)
    const cartDetails = useSelector(({ appUser }) => appUser.cartDetails)
    if (Cart.length > 0 && cartDetails == null && !gettingCart) {
        dispatch(getCartDetails({ cart: Cart }))
        console.log('Cart.length: ', Cart)
    }
    const { products, price, taxes, delivery_fee, total_price } = cartDetails ?
        cartDetails :
        [[], 0, 0, 0, 0]
    if (Cart.length > 0 && cartDetails != null && !gettingCart) {
        if (products) {
            products.length != Cart.length ? dispatch(getCartDetails({ cart: Cart })) : null
        } else dispatch(getCartDetails({ cart: Cart }))
    }
    // dispatch(setUserCart([]))
    // dispatch(setAsyncCart([]))
    console.log('cartDetails out ', cartDetails)
    console.log('products.length out: ', products)
    console.log('Cart.length out: ', Cart)
    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {gettingCart && <Spinner size='large' color='#F47421' />}
            {Cart.length == 0 && !gettingCart && <Text style={styles.notFoundText}>{I18n.t('worker.orders.notFound')}</Text>}
            <FlatList
                refreshing={false}
                key='CartItemsList'
                style={styles.ListStyle}
                keyExtractor={item => item.id}
                data={products && Cart.length > 0 ? products : []}
                onRefresh={() => dispatch(getCartDetails({ cart: Cart }))}
                renderItem={({ item }) => <CartProduct _item={item} _quantity={item.quantity} />}
            />
            {Cart.length > 0 &&
                <ScrollView style={styles.Container}>
                    <View style={styles.infoList}>
                        <InfoRow lang={lang}
                            Title={I18n.t('cart.totalSalary')}
                            Cost={price}
                            Tag={I18n.t('cart.sar')}
                        />
                        <InfoRow lang={lang}
                            Title={I18n.t('cart.tax')}
                            Cost={taxes}
                            Tag={I18n.t('cart.sar')}
                        />
                        <InfoRow lang={lang}
                            Title={I18n.t('cart.deliveryFee')}
                            Cost={delivery_fee}
                            Tag={I18n.t('cart.sar')}
                        />
                        <InfoTotal lang={lang}
                            Title={I18n.t('cart.Total')}
                            Cost={total_price}
                            Tag={I18n.t('cart.sar')}
                        />
                    </View>
                    <ColoredButton
                        title={I18n.t('cart.completeOrder')}
                        ContStyle={styles.buyButton}
                        OnPress={() => navigate('UserInfo', { type: 'other', date: "" })}
                    />
                </ScrollView>}
        </SafeAreaView >
    )
}

export default Cart
