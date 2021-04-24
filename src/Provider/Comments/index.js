import React, { useState } from 'react'
import { SafeAreaView, FlatList, Text, View, Image } from 'react-native'
import Header from '../../custom/header';
import styles from './styles';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'native-base';
import { getProviderRates } from '../../Redux/Slices/Provider/info';
import StarRating from 'react-native-star-rating';
import { dyafah } from '../../assets/consts';

const ProductRate = ({ _rate }) => {
    console.log("ProductRate: ", _rate)
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const { ar_name, en_name, ar_description, en_description, rate, product_image } = _rate
    const { uri } = product_image
    return (
        <View style={[styles.rateView, langView]}>
            <Image source={{ uri: `${dyafah}${uri}` }} style={styles.rateImage} defaultSource={require('../../assets/images/logo.png')} />
            <View style={styles.rateDetails}>
                <Text style={[styles.rateText, langText]}>{lang == 'ar' ? ar_name : en_name}</Text>
                <Text style={[styles.rateText, langText]}>{lang == 'ar' ? ar_description : en_description}</Text>
                <StarRating
                    reversed={lang == 'ar'}
                    maxStars={5}
                    starSize={20}
                    rating={rate}
                    halfStarEnabled
                    disabled
                    starStyle={styles.starsStyle}
                    containerStyle={[styles.starsContainer, , { alignSelf: lang == 'ar' ? 'flex-end' : 'flex-start' }]}
                />
            </View>
        </View>
    )
}

const ProviderRates = (props) => {
    const dispatch = useDispatch()
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const loadingRates = useSelector(({ provider }) => provider.loadingRates)
    const providerRates = useSelector(({ provider }) => provider.providerRates)
    const notFound = providerRates.length > 0 ? false : true

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} />
            {loadingRates && <Spinner size='large' color='#F47421' />}
            {notFound && !loadingRates && <Text style={styles.notFoundText}>{I18n.t('provider.notFound')}</Text>}
            <FlatList
                key='ProviderRatesList'
                refreshing={false}
                onRefresh={() => dispatch(getProviderRates({ api_token }))}
                data={providerRates ? providerRates : []}
                style={styles.ListStyle}
                renderItem={({ item }) => <ProductRate _rate={item} />}
                keyExtractor={item => item.comment}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default ProviderRates
