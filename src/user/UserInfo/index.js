import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../custom/header';
import styles from './styles';
import { Icon, Spinner } from 'native-base';
import Payment from '../../custom/PaymentMethods';
import ColoredButton from '../../custom/ColoredButton';
import ConfirmMessage from '../../custom/ConfirmMessage';
import I18n from '../../languages/I18n';
import { creatingOrder, getCartDetails, orderSuccess } from '../../Redux/Slices/Main/appUser';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { CommonActions } from '@react-navigation/native';

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

const UserInfo = (props) => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const { type, date } = props.route.params
    console.log("type, date: ", type, date)
    const [modalVisible, setModalVisible] = useState(false)
    const Location = useSelector(({ home }) => home.Location)
    const [payment_method, setPayment] = useState('cash')
    const lang = useSelector(({ language }) => language.language)
    const user = useSelector(({ appUser }) => appUser.appUser)
    const [Address, setAddress] = useState(user.address)
    const makingOrder = useSelector(({ appUser }) => appUser.makingOrder)
    const productDetails = useSelector(({ appUser }) => appUser.productDetails)
    const Cart = useSelector(({ appUser }) => appUser.Cart)
    const gettingCart = useSelector(({ appUser }) => appUser.gettingCart)
    const Order = useSelector(({ appUser }) => appUser.Order)
    const orderPass = useSelector(({ appUser }) => appUser.orderPass)
    const { product } = productDetails != null ? productDetails : [null]
    const { id } = product ? product : [0]
    const rowView = lang == 'ar' ? styles.rowView : [styles.rowView, { flexDirection: 'row' }]
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { products } = Order ? Order.products ? Order : [[{ id: -1 }]] : [[{ id: -1 }]]

    Location != '' && Address != Location ? setAddress(Location) : null

    if (type == 'worker') {
        if (Order == null || products[0].id != id) {
            dispatch(getCartDetails({ cart: [{ product_id: id, quantity: 1, dates: date }], order: true }))
        }
    }
    if (type != 'worker' && Cart.length > 0) {
        console.log("else if Cart: ", Cart)
        if (products == undefined || products == []) {
            dispatch(getCartDetails({ cart: Cart, order: true }))
        } else if (products[0].id != Cart[0].product_id || products.length != Cart.length) {
            dispatch(getCartDetails({ cart: Cart, order: true }))
        }
    }
    //else if (products.length != Cart.length || products[0].id != Cart[0].product_id) {
    //Cart != [] ? dispatch(getCartDetails({ cart: Cart, order: true })) : null
    // } //edited by me
    // if (Order != null && type == 'worker') {
    //     if (products.length > 1) {
    //         dispatch(getCartDetails({ cart: [{ product_id: id, quantity: 1, dates: date }], order: true }))
    //     } else if (products[0].id != id) { dispatch(getCartDetails({ cart: [{ product_id: id, quantity: 1, dates: date }], order: true })) }
    // }
    const { price, taxes, delivery_fee, total_price } = Order ? Order : [0, 0, 0, 0]

    const _CreateOrder = () => {
        const { api_token } = user
        const sentAddress = Location != '' ? Location : Address
        if (type == 'worker') {
            dispatch(creatingOrder({ api_token, payment_method, address: sentAddress, cart: [{ product_id: id, quantity: 1, dates: date }], cartBool: false }))
        } else {
            dispatch(creatingOrder({ api_token, payment_method, address: sentAddress, cart: Cart, cartBool: true }))
        }
    }

    const _showPop = () => {
        setModalVisible(true);
        dispatch(orderSuccess(false));
        // if (type == 'worker') {
        //     props.navigation.goBack();
        //     props.navigation.goBack();
        // }
        // props.navigation.goBack();
        // props.navigation.goBack();
        // setModalVisible(true);
    }
    orderPass ? _showPop() : null

    const _getAddress = () => {
        navigate('GoogleMaps')
    }

    if (user.api_token == null) {
        return (
            <SafeAreaView style={styles.container} >
                <Header props={props} />
                <Text style={styles.authText}>{I18n.t('profile.auth')}</Text>
                <TouchableOpacity
                    onPress={() => navigate('Login', { page: 'UserInfo' })}
                    style={styles.loginButton}
                >
                    <Text style={styles.titleText}>{I18n.t('userAuth.goToLogin')}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={styles.container} >
                <Header props={props} />
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{I18n.t('infoDetails.label')}</Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View style={[styles.addressView, langView]}>
                        <TextInput
                            placeholder={I18n.t('infoDetails.address')}
                            value={Address}
                            onChangeText={(text) => setAddress(text)}
                            style={[styles.addressStyle, langText]}
                        />
                        <TouchableOpacity onPress={() => _getAddress()}>
                            <Icon type='FontAwesome' name='map-marker' style={styles.addressIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paymentView}>
                        <Payment _setPayment={setPayment} />
                    </View>
                    {gettingCart && <View style={styles.infoList}><Spinner size='large' color='#F47421' /></View>}
                    {!gettingCart && <View style={styles.infoList}>
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
                    </View>}
                    <View style={rowView}>
                        <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                        <Text style={styles.textRow}>{I18n.t('statments.stat1')}</Text>
                    </View>
                    <View style={rowView}>
                        <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                        <Text style={styles.textRow}>{I18n.t('statments.stat2')}</Text>
                    </View>
                    <View style={rowView}>
                        <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                        <Text style={styles.textRow}>{I18n.t('statments.stat3')}</Text>
                    </View>
                    {makingOrder && <Spinner size='large' color='#F47421' />}
                    {!makingOrder && <ColoredButton
                        title={type != 'worker' ? I18n.t('cart.completeOrder') : I18n.t('cart.completeReservation')}
                        ContStyle={styles.button}
                        OnPress={() => _CreateOrder()}
                    />}
                    {/* Modal */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onDismiss={() => setModalVisible(false)}
                        onRequestClose={() => setModalVisible(false)}>
                        <ConfirmMessage OnPress={setModalVisible} goBack={() => props.navigation.canGoBack() ? props.navigation.goBack() : null} />
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default UserInfo
