import React, { useState } from 'react'
import { View, Text, FlatList, Image, Modal, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import I18n from '../../languages/I18n';
import ColoredButton from '../ColoredButton';
import BillMessage from '../BillMessage';
import { dyafah } from '../../assets/consts';
import ConfirmMessage from '../ConfirmMessage';
import MultiChoiceModal from '../MultiChoiceModal';
import StarRating from 'react-native-star-rating';
import { getOrderDetails, rateOrder } from '../../Redux/Slices/Main/appUser';
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
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={[infoRow, langView]}>
            <Text style={[styles.infoTotalTitle, langText]}>{Title}</Text>
            <Text style={styles.infoTotalCost}>{Cost}</Text>
            <Text style={styles.infoTotalTag}>{Tag}</Text>
        </View>
    )
}

const OrderSummry = ({ summry }) => {
    const { price, taxes, delivery_fee, total_price } = summry ? summry : ['price', 'taxes', 'delivery_fee', 'total_price']
    const lang = useSelector(({ language }) => language.language)
    return (
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
    )
}

const SubOrder = ({ order, _onItemPress, _onRate }) => {
    const [modal2, setModal2] = useState(false)
    const { quantity, price, status, product } = order ? order : [0, 0, null]
    const { id, ar_name, en_name, ar_description, en_description, product_image, provider, user_rate, type } = product ? product : [0, '', '', '', '', null, null, 0]
    console.log("SubOrder product: ", product)
    const { image } = provider ? provider : [null]
    const orderImage = product_image ? { uri: `${dyafah}${product_image.image}` } :
        image ? { uri: `${dyafah}${image}` } : require('../../assets/images/kapsa.png')
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const line = lang == 'en' ? styles.leftLine : styles.rightLine
    if (product == null) {
        return (<></>)
    } else return (
        <TouchableOpacity onPress={() => setModal2(!modal2)} style={[styles.subOrderContainer, langView]}>
            <Image source={orderImage}
                style={styles.subOrderImage} 
                defaultSource={require('../../assets/images/logo.png')} />
            <View style={[styles.subOrderDetails, line]}>
                <Text style={[styles.titleText, langText]}>{lang == 'ar' ? ar_name : en_name}</Text>
                <Text style={[styles.descText, langText]}>{lang == 'ar' ? ar_description : en_description}</Text>
                <View style={[styles.countView, langView]}>
                    <Text style={[styles.descText, langText]}>{I18n.t('lastOrders.count')}</Text>
                    <Text style={styles.countText}> {quantity} </Text>
                </View>
                <Text style={[styles.costText, langText]}>{I18n.t('cart.cost')} {price} {I18n.t('cart.sar')}</Text>
                <Text style={[styles.costText, langText]}>{I18n.t('cart.status')} {I18n.t(`cart.statuses.${status}`)}</Text>
                {user_rate > 0 && <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={20}
                    rating={user_rate}
                    halfStarEnabled
                    disabled
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, { alignSelf: lang == 'ar' ? 'flex-end' : 'flex-start' }]}
                />}
            </View>
            {/* choose rate or go to product profile modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal2}
                onDismiss={() => setModal2(false)}
                onRequestClose={() => setModal2(false)}>
                <MultiChoiceModal
                    OnPress={setModal2}
                    _onGoPress={() => _onItemPress(id)}
                    _onRate={user_rate == 0 && status == 'complete' ? _onRate : null}
                    _id={id}
                    _orderType={type}
                />
            </Modal>
        </TouchableOpacity>
    )
}

const FoodOrderDetails = ({ _details, order_id, _onItemPress, _onRate }) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const ratingOrder = useSelector(({ appUser }) => appUser.ratingOrder)
    const { details, invoice, rate } = _details ? _details : [[], null, 0]
    const [modalVisible, setModalVisible] = useState(false)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    console.log("Food Order Details: ", _details)

    const _onRating = (rating) => {
        if (rate == 0) {
            console.log('_onRating: ', rating, ' ', order_id)
            dispatch(rateOrder({ api_token, rate: rating, order_id }))
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.subOrdersList}>
                <FlatList
                    key='FoodSubOrdersList'
                    data={details}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <SubOrder
                            order={item}
                            _onItemPress={_onItemPress}
                            _onRate={_onRate}
                        />}
                />
            </View>
            <View style={[styles.orderRate, langView]}>
                <Text style={styles.orderRateLabel}>{I18n.t('lastOrders.rateOrder')}</Text>
                {ratingOrder && <Spinner size='large' color='#F7901F' />}
                {!ratingOrder && <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={25}
                    rating={rate}
                    halfStarEnabled
                    disabled={false}
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, { alignSelf: lang == 'ar' ? 'flex-end' : 'flex-start' }]}
                    selectedStar={(rating) => _onRating(rating)}
                />}
            </View>
            <View style={styles.orderSummery}>
                <OrderSummry summry={invoice} />
                <ColoredButton
                    ContStyle={styles.billButton}
                    title={I18n.t('lastOrders.showBill')}
                    OnPress={() => setModalVisible(true)}
                />
            </View>
            {/* Bill Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}>
                <BillMessage order_id={order_id} OnPress={setModalVisible} _details={_details} />
            </Modal>
        </View>
    )
}

export default FoodOrderDetails
