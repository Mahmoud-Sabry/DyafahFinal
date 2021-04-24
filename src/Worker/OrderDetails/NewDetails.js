import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import Header from '../../custom/header'
import styles from './styles'
import I18n from '../../languages/I18n'
import { useSelector } from 'react-redux'
import { dyafah } from '../../assets/consts'


const InfoContainer = ({ _info, _detail }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = [styles.infoView, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={langView}>
            <Text style={[styles.infoText, langText]}>{_info}</Text>
            <Text style={[styles.detailText, langText]}>{_detail}</Text>
        </View>
    )
}

const DateContainer = ({ _info, _date1, _date2 }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = [styles.infoView, { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }]
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    return (
        <View style={langView}>
            <Text style={[styles.infoText, langText]}>{_info}</Text>
            <View style={styles.dateView}><Text style={[styles.detailText, langText]}>{_date1}</Text></View>
            {/* <View style={styles.dateView}><Text style={styles.detailText}>{_date2}</Text></View> */}
        </View>
    )
}


const NewDetails = (props) => {
    const { item } = props.route.params
    const lang = useSelector(({ language }) => language.language)
    const { username, phone, address, price, taxs, total_price, order_details, image } = item ? item : ['', '', '', '', null]
    const url = image ? { uri: `${dyafah}${image}` } : require('../../assets/images/worker.png')
    const { day } = order_details ? order_details[0].dates[0] ? order_details[0].dates[0] : '' : ''
    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <ScrollView style={styles.Container}>
                <Image
                    source={url}
                    style={styles.profileImage}
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.name')}
                    _detail={username}
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.phone')}
                    _detail={phone}
                />
                <DateContainer
                    _info={I18n.t('worker.orders.date')}
                    _date1={day} //'12 / مارس / 2020'
                // _date2='4 / شعبان / 1441'
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.time')}
                    _detail='يوم كامل'
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.address')}
                    _detail={address} //'حفر للباطن المملكو العربية السعوديه'
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.price')}
                    _detail={`${price} ${I18n.t('worker.orders.sar')}`}
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.taxs')}
                    _detail={`${taxs} ${I18n.t('worker.orders.sar')}`}
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.totalPrice')}
                    _detail={`${total_price} ${I18n.t('worker.orders.sar')}`}
                />
                <InfoContainer
                    _info={I18n.t('worker.orders.payment')}
                    _detail={I18n.t('worker.orders.payments.cash')}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewDetails

