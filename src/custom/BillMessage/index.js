import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Icon, Spinner } from 'native-base'
import styles from './styles'
import ColoredButton from '../ColoredButton'
import I18n from '../../languages/I18n'
import { useDispatch, useSelector } from 'react-redux'
import { sendBill } from '../../Redux/Slices/Main/appUser'

const TabelHeader = () => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    return (
        <View style={[styles.headerView, langView]}>
            <Text style={styles.productName}>{I18n.t('provider.orders.products')}</Text>
            <Text style={styles.productCost}>{I18n.t('provider.orders.price')}</Text>
            <Text style={styles.productCount}>{I18n.t('provider.orders.quantity')}</Text>
            <Text style={styles.productTotalCost}>{I18n.t('provider.orders.totalPrice')}</Text>
        </View>
    )
}
const TabelRow = ({ item }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const { price, quantity, total_price, product } = item ? item : [0, 0, 0, null]
    const { ar_name } = product ? product : 'name'
    return (
        <View style={[styles.rowView, langView]}>
            <Text style={styles.rowName}>{ar_name}</Text>
            <Text style={styles.rowCost}>{price}</Text>
            <Text style={styles.rowCount}>{quantity}</Text>
            <Text style={styles.rowTotalCost}>{total_price}</Text>
        </View>
    )
}

const InfoRow = ({ Title, Cost, Tag }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    return (
        <View style={[styles.infoRow, langView]}>
            <Text style={[styles.infoTitle, langText]}>{Title}</Text>
            <Text style={styles.infoCost}>{Cost}</Text>
            <Text style={styles.infoTag}>{Tag}</Text>
        </View>
    )
}
const InfoTotal = ({ Title, Cost, Tag }) => {
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    return (
        <View style={[styles.infoRow, langView]}>
            <Text style={[styles.infoTotalTitle, langText]}>{Title}</Text>
            <Text style={styles.infoTotalCost}>{Cost}</Text>
            <Text style={styles.infoTotalTag}>{Tag}</Text>
        </View>
    )
}


const BillMessage = ({ OnPress, _details, order_id }) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const sendingBill = useSelector(({ appUser }) => appUser.sendingBill)
    const orderDetails = useSelector(({ appUser }) => appUser.orderDetails)
    const { details, invoice, id, providers } = _details ? _details : orderDetails ? orderDetails : [[], null, null, []]
    const { price, taxes, delivery_fee, total_price } = invoice ? invoice : ['', '', '', '']
    const _sendBillToMail = () => {
        order_id ? dispatch(sendBill({ api_token, order_id })) :
            dispatch(sendBill({ api_token, order_id: id }))
    }

    let _providersNames = providers.map((item, index) => {
        return <Text style={[styles.providerName, langText]}>{lang == 'ar' ? item.ar_name : item.en_name}</Text>
    })

    return (
        <View style={styles.popView} >
            <View style={styles.messageContainer} >
                <TouchableOpacity style={styles.closeButton} onPress={() => OnPress(false)}>
                    <Icon type='AntDesign' name='close' style={styles.closeIcon} />
                </TouchableOpacity>
                <Text style={styles.confirmTitle}>{I18n.t('lastOrders.orderBill')}</Text>
                {_providersNames}
                <TabelHeader />
                <FlatList
                    key='BillMessageOrdersList'
                    data={details}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TabelRow item={item} />}
                    style={{ flex: .75 }}
                />
                <View style={styles.infoList}>
                    <InfoRow Title={I18n.t('cart.totalSalary')} Cost={price} Tag={I18n.t('cart.sar')} />
                    <InfoRow Title={I18n.t('cart.tax')} Cost={taxes} Tag={I18n.t('cart.sar')} />
                    <InfoRow Title={I18n.t('cart.deliveryFee')} Cost={delivery_fee} Tag={I18n.t('cart.sar')} />
                    <InfoTotal Title={I18n.t('cart.Total')} Cost={total_price} Tag={I18n.t('cart.sar')} />
                </View>
                {sendingBill && <Spinner size='large' color='#ffffff' />}
                {!sendingBill && <ColoredButton
                    TextStyle={styles.sendText}
                    ContStyle={styles.sendButton}
                    title={I18n.t('lastOrders.sendBill')}
                    OnPress={() => _sendBillToMail()}
                />}
            </View>
        </View>
    )
}

export default BillMessage