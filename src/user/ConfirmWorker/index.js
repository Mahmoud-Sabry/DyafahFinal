import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon, Spinner } from 'native-base';
import styles from './styles'
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import Payment from '../../custom/PaymentMethods';
import { useSelector, useDispatch } from 'react-redux';
import { dyafah } from '../../assets/consts';
import I18n from '../../languages/I18n';

const ConfirmWorker = (props) => {
    const { date } = props.route.params
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const dispatch = useDispatch()
    const productDetails = useSelector(({ appUser }) => appUser.productDetails)
    const detailsLoading = useSelector(({ appUser }) => appUser.detailsLoading)
    const reviews = useSelector(({ home }) => home.reviews)
    const { product } = productDetails ? productDetails : null
    const {
        id, category_id, type, ar_name, en_name, ar_description, en_description, has_offer, is_favourite,
        offer_price, offer_description, price, rate, details, images, sales
    } = product ? product : [0, 0, 'type', '', '', 0, 0, 0, '', 0, 0, [], [], 0]
    let imagesList = []
    if (images) {
        images.forEach(image => {
            imagesList.push({ id: image.id, url: `${dyafah}${image.image}` })
        })
    }
    console.log("Date: ", date)

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {detailsLoading && <Spinner size='large' color='#F47421' />}
            {!detailsLoading && <PlacesAds DataSource={imagesList} />}
            {!detailsLoading && <ScrollView style={styles.ScrollContainer} >
                <View style={[styles.favTitleView, langView]}>
                    <View>
                        <Text style={[styles.itemTitle, langText]}>{lang == 'ar' ? ar_name : en_name}</Text>
                        <Text style={[styles.itemDescription, langText]}>{lang == 'ar' ? ar_description : en_description}</Text>
                    </View>
                </View>
                <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={25}
                    rating={rate}
                    halfStarEnabled
                    disabled={false}
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, { alignSelf: lang == 'en' ? 'flex-start' : 'flex-end' }]}
                />
                <Text style={[styles.itemInfoTitle, langText]}>{I18n.t('product.details')}</Text>
                {details.length > 0 && <FlatList
                    data={details}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Text style={[styles.workerinfo, langText]}>
                        {item.value}</Text>}
                />}
                <Text style={[styles.itemInfoTitle, langText]}>{I18n.t('product.choosenDate')}</Text>
                <View style={[styles.rowButtonsView, langView]} >
                    <View style={styles.choosenDate} >
                        <Text style={styles.dateText}>{date}</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon type='MaterialCommunityIcons' name='square-edit-outline' style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                {has_offer == 1 && <Text style={[styles.itemSalary, langText]}>{I18n.t('searchFilter.price')} {offer_price} {I18n.t('provider.offers.insteadof')}
                    <Text style={[styles.itemSalary, langText, { textDecorationLine: 'line-through' }]}>
                        {price} {I18n.t('cart.sar')}
                    </Text>
                </Text>}
                {has_offer != 1 &&
                    <Text style={[styles.itemSalary, langText]}>
                        {I18n.t('searchFilter.price')} {price} {I18n.t('cart.sar')}
                    </Text>}
                <View style={[styles.rowView, langView]}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={[styles.textRow, langText]}>{I18n.t('statments.stat1')}</Text>
                </View>
                <View style={[styles.rowView, langView]}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={[styles.textRow, langText]}>{I18n.t('statments.stat2')}</Text>
                </View>
                <View style={[styles.rowView, langView]}>
                    <Icon type='Octicons' name='primitive-dot' style={styles.icon} />
                    <Text style={[styles.textRow, langText]}>{I18n.t('statments.stat3')}</Text>
                </View>
                <ColoredButton
                    ContStyle={styles.buttonStyle}
                    title={I18n.t('product.confirm')}
                    OnPress={() => props.navigation.navigate('UserInfo', { date, type: 'worker' })}
                />
            </ScrollView>}
        </SafeAreaView>
    )
}

export default ConfirmWorker
