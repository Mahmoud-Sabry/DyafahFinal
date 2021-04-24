import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Icon, Spinner } from 'native-base';
import styles from './styles'
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import ColoredButton from '../../custom/ColoredButton';
import BorderdButton from '../../custom/BorderdButton';
import { useSelector, useDispatch } from 'react-redux';
import { dyafah } from '../../assets/consts';
import I18n from '../../languages/I18n';
import { getDates, getReviews } from '../../Redux/Slices/User/home';
import { addToFav } from '../../Redux/Slices/Main/appUser';
import ShowToast from '../../custom/Toast';


const WorkerDetails = ({ pd, props }) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const detailsLoading = useSelector(({ appUser }) => appUser.detailsLoading)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const favAdding = useSelector(({ appUser }) => appUser.favAdding)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { product } = pd ? pd : null
    const {
        id, type, ar_name, en_name, ar_description, en_description, has_offer, is_favourite,
        offer_price, offer_description, price, rate, details, images
    } = product ? product : [0, 'type', '', '', 0, 0, 0, '', 0, 0, [], []]
    const [fav, setFav] = useState(is_favourite == 1)
    let imagesList = []
    if (images) {
        images.forEach(image => {
            imagesList.push({ id: image.id, url: `${dyafah}${image.image}` })
        })
    }

    const _onReviewsPressed = () => {
        dispatch(getReviews({ id }))
        props.navigation.navigate('Comments')
    }

    const _onReservePressed = () => {
        dispatch(getDates({ id }))
        props.navigation.navigate('ChooseDate', { type: 'worker' })
    }

    const _onHeartPress = () => {
        const { api_token, role } = appUser ? appUser : [null, null]
        if (api_token != null) {
            dispatch(addToFav({ api_token, product_id: id, type: role }))
            setFav(!fav)
        } else ShowToast(I18n.t('profile.auth'), 'warning')
    }
    return (
        <>
            {!detailsLoading && <PlacesAds DataSource={imagesList} />}
            {!detailsLoading && <ScrollView style={styles.ScrollContainer} >
                <View style={[styles.favTitleView, langView]}>
                    <View>
                        <Text style={[styles.itemTitle, langText]}>{lang == 'ar' ? ar_name : en_name}</Text>
                        <Text style={[styles.itemDescription, langText]}>{lang == 'ar' ? ar_description : en_description}</Text>
                    </View>
                    {favAdding && <Spinner size='large' color='#F47421' />}
                    {!favAdding && <TouchableOpacity style={styles.heartButton} onPress={() => _onHeartPress()}>
                        <Icon type='AntDesign' name='heart' style={[styles.heartIcon, { color: fav ? '#F7901F' : '#ffffff' }]} />
                    </TouchableOpacity>}
                </View>
                <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={20}
                    rating={rate}
                    halfStarEnabled
                    disabled={false}
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, { alignSelf: lang == 'en' ? 'flex-start' : 'flex-end' }]}
                />
                {details.length > 0 && <Text style={[styles.itemInfoTitle, langText]}>{I18n.t('product.details')}</Text>}
                {details.length > 0 && <FlatList
                    data={details}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Text style={[styles.workerinfo, langText]}>
                        {item.value}</Text>}
                />}
                {has_offer == 1 && <Text style={[styles.itemSalary, langText]}>{I18n.t('searchFilter.price')} {offer_price} {I18n.t('provider.offers.insteadof')}
                    <Text style={[styles.itemSalary, langText, { textDecorationLine: 'line-through' }]}>
                        {price} {I18n.t('cart.sar')}
                    </Text>
                </Text> &&
                    <Text style={[styles.itemDescription, langText]}>{offer_description}</Text>}
                {has_offer != 1 && <Text style={[styles.itemSalary, langText]}>{I18n.t('searchFilter.price')} {price} {I18n.t('cart.sar')}</Text>}
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
                <View style={[styles.rowButtonsView, langView]}>
                    <BorderdButton
                        title={I18n.t('product.reviews')}
                        OnPress={() => _onReviewsPressed()}
                    />
                    <ColoredButton
                        title={I18n.t('product.reservation')}
                        OnPress={() => _onReservePressed()}
                    />
                </View>
            </ScrollView>}
        </>
    )
}

const WorkerView = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const pd = useSelector(({ appUser }) => appUser.productDetails)
    const detailsLoading = useSelector(({ appUser }) => appUser.detailsLoading)


    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            {detailsLoading && <Spinner size='large' color='#F47421' />}
            {!detailsLoading && <WorkerDetails pd={pd} props={props} />}
        </SafeAreaView>
    )
}

export default WorkerView
