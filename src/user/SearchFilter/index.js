import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Header from '../../custom/header';
import FilterSection from '../../custom/FilterSection';
import ColoredButton from '../../custom/ColoredButton';
import BorderdButton from '../../custom/BorderdButton';
import styles from './styles';
import Slider from '@react-native-community/slider';
import I18n from '../../languages/I18n';
import { startSearch } from '../../Redux/Slices/User/home';

const SearchFilter = (props) => {
    const lang = useSelector(({ language }) => language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const dispatch = useDispatch()
    const [price, setPrice] = useState(1500)
    const [keyword, setKeyword] = useState('')
    const [type, setType] = useState('car')
    const [order, setOrder] = useState('sales')
    const [lowPrice, setLowPrice] = useState(false)

    const _onSearchPressed = () => {
        const { api_token } = appUser ? appUser : [null]
        console.log("Search Filters: ", keyword, ' ', type, ' ', order, ' ', lowPrice)
        dispatch(startSearch({
            api_token, keyword, type, order, price: !lowPrice ? 'asc' : 'desc'
        }))
        props.navigation.navigate('SearchResults')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header props={props} inSearch={true} />
            <ScrollView style={styles.container}>
                <FilterSection
                    title={I18n.t('searchFilter.pickSection')}
                    buttons={[{ title: I18n.t('searchFilter.carWithWorker'), value: 'car' },
                    { title: I18n.t('searchFilter.cooking'), value: 'worker' },
                    { title: I18n.t('searchFilter.places'), value: 'place' },
                    { title: I18n.t('searchFilter.kashta'), value: 'kashta' },
                    { title: I18n.t('searchFilter.eating'), value: 'popular_eating' }]}
                    value={type}
                    setValue={setType}
                />
                <View style={styles.lineView} />
                <FilterSection
                    title={I18n.t('searchFilter.ordering')}
                    buttons={[{ title: I18n.t('searchFilter.bestSeller'), value: 'sales' },
                    // { title: I18n.t('searchFilter.closer'), value: 'close' },
                    { title: I18n.t('searchFilter.bestRate'), value: 'rate' }]}
                    value={order}
                    setValue={setOrder}
                />
                <View style={styles.lineView} />
                <Text style={styles.priceLabel}>{I18n.t('searchFilter.price')}  {price}</Text>
                <View style={styles.priceSliderLabelsView} >
                    <Text style={styles.priceSliderLabel}>0,00</Text>
                    <Text style={styles.priceSliderLabel}>1500</Text>
                    <Text style={styles.priceSliderLabel}>3000</Text>
                </View>
                <Slider
                    inverted
                    style={styles.priceSlider}
                    minimumValue={0}
                    maximumValue={3000}
                    minimumTrackTintColor="#F58620"
                    maximumTrackTintColor="#CCCCCC"
                    value={price}
                    onValueChange={(value) => {
                        setPrice(value)
                    }}
                />
                <View style={styles.priceButtonsView}>
                    {!lowPrice ?
                        <BorderdButton
                            title={I18n.t('searchFilter.highPrice')}
                            ContStyle={styles.priceButton}
                            TextStyle={styles.priceButtonText}
                            OnPress={() => setLowPrice(!lowPrice)}
                        /> :
                        <ColoredButton
                            title={I18n.t('searchFilter.highPrice')}
                            ContStyle={styles.priceButton}
                            TextStyle={styles.priceButtonText}
                            OnPress={() => setLowPrice(!lowPrice)}
                        />}
                    {lowPrice ?
                        <BorderdButton
                            title={I18n.t('searchFilter.lowPrice')}
                            ContStyle={styles.priceButton}
                            TextStyle={styles.priceButtonText}
                            OnPress={() => setLowPrice(!lowPrice)}
                        /> :
                        <ColoredButton
                            title={I18n.t('searchFilter.lowPrice')}
                            ContStyle={styles.priceButton}
                            TextStyle={styles.priceButtonText}
                            OnPress={() => setLowPrice(!lowPrice)}
                        />}
                </View>
                <ColoredButton
                    title={I18n.t('searchFilter.search')}
                    ContStyle={styles.searchButton}
                    OnPress={() => _onSearchPressed()}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchFilter
