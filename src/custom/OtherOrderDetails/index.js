import React, { useState } from 'react'
import { View, Text, FlatList, Image, Modal, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import styles from './styles';
import I18n from '../../languages/I18n';
import ColoredButton from '../ColoredButton';
import BillMessage from '../BillMessage';
import StarRating from 'react-native-star-rating';

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

const OrderSummry = () => {
    const lang = useSelector(({ language }) => language.language)
    return (
        <View style={styles.infoList}>
            <InfoRow lang={lang}
                Title={I18n.t('cart.totalSalary')}
                Cost='1500'
                Tag={I18n.t('cart.sar')}
            />
            <InfoRow lang={lang}
                Title={I18n.t('cart.tax')}
                Cost='15'
                Tag={I18n.t('cart.sar')}
            />
            <InfoRow lang={lang}
                Title={I18n.t('cart.deliveryFee')}
                Cost='155'
                Tag={I18n.t('cart.sar')}
            />
            <InfoTotal lang={lang}
                Title={I18n.t('cart.Total')}
                Cost='1670'
                Tag={I18n.t('cart.sar')}
            />
        </View>
    )
}

const SubOrder = () => {
    const lang = useSelector(({ language }) => language.language)
    const [stars, setStars] = useState(3.5)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const line = lang == 'en' ? styles.leftLine : styles.rightLine
    return (
        <TouchableOpacity style={[styles.subOrderContainer, langView]}>
            <Image source={require('../../assets/images/worker.png')}
                style={styles.subOrderImage} 
                defaultSource={require('../../assets/images/logo.png')} />
            <View style={[styles.subOrderDetails, line]}>
                <Text style={[styles.titleText, langText]}>محمد احمد عبد العزيز</Text>
                <Text style={[styles.descText, langText]}>
                    عامل تنظيف
                </Text>
                <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={21}
                    rating={stars}
                    halfStarEnabled
                    disabled={false}
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, { alignSelf: lang == 'ar' ? 'flex-end' : 'flex-start' }]}
                    selectedStar={(rating) => setStars(rating)}
                />
                <Text style={[styles.costText, langText]}>{I18n.t('cart.cost')} 500 {I18n.t('cart.sar')}</Text>
            </View>
        </TouchableOpacity>
    )
}

const OtherOrderDetails = () => {
    const [subOrders, setsubOrders] = useState([1])
    const lang = useSelector(({ language }) => language.language)
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.Container}>
            <View style={styles.subOrdersList}>
                <FlatList
                    key='FoodSubOrdersList'
                    data={subOrders}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <SubOrder />}
                />
            </View>
            <View style={styles.orderSummery}>
                <OrderSummry />
                <ColoredButton
                    ContStyle={styles.billButton}
                    title='عرض الفاتورة'
                    OnPress={() => setModalVisible(true)}
                />
            </View>
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                onRequestClose={() => setModalVisible(false)}>
                <BillMessage OnPress={setModalVisible} />
            </Modal>
        </View>
    )
}

export default OtherOrderDetails
