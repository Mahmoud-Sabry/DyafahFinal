import React from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import PlacesAds from '../../custom/Ads';
import Header from '../../custom/header';
import CategoryButton from '../../custom/categoryButton';
import KashtaButton from '../../custom/KashtaButton';
import I18n from '../../languages/I18n';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { getTopSlider, getBottomSlider } from '../../Redux/Slices/User/home';
import { Spinner } from 'native-base';
import { setNotifiToken } from '../../Redux/Slices/Main/appUser';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import { useEffect } from 'react';

const Home = (props) => {
    Geocoder.init("AIzaSyCIBDep_TSJxP1G5PPSEeYPk7zK6TKI3gM") //, { language: "ar" }
    const lang = useSelector(({ language }) => language.language)
    const { api_token } = useSelector(({ appUser }) => appUser.appUser)
    const deviceToken = useSelector(({ appUser }) => appUser.deviceToken)
    const tokenSent = useSelector(({ appUser }) => appUser.tokenSent)
    const bottomSlider = useSelector(({ home }) => home.bottomSlider)
    const topSlider = useSelector(({ home }) => home.topSlider)
    const bottomLoading = useSelector(({ home }) => home.bottomLoading)
    const topLoading = useSelector(({ home }) => home.topLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBottomSlider())
        dispatch(getTopSlider())
    }, [])
    // bottomSlider.length == 0 ? dispatch(getBottomSlider()) : null
    // topSlider.length == 0 ? dispatch(getTopSlider()) : null

    api_token && deviceToken && !tokenSent ? dispatch(setNotifiToken({ api_token, token: deviceToken })) : null

    // async function _getAddress() {
    //     await Geolocation.getCurrentPosition(
    //         position => {
    //             const initialPosition = JSON.stringify(position);
    //             console.log('getCurrentPosition: ', position)
    //             Geocoder.from(position.coords.latitude, position.coords.longitude).then(json => {
    //                 var addressComponent = json.results[0].formatted_address
    //                 console.log('Geocoder: ', addressComponent);
    //             })
    //                 .catch(error => console.log(error));
    //         },
    //         error => console.log('Error', JSON.stringify(error)),
    //         { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    //     )
    // }

    return (
        <SafeAreaView style={styles.Container}>
            <Header props={props} />
            <ScrollView style={styles.Container} >
                {/* Places Ads */}
                {topLoading && <Spinner size='large' color='#F47421' />}
                {!topLoading && <PlacesAds DataSource={topSlider} />}
                {/* Categories View */}
                {/* <TouchableOpacity onPress={() => _getAddress()}>
                    <Text >get address</Text>
                </TouchableOpacity> */}
                <View style={styles.CategoriesView} >
                    <View style={styles.CategoriesRow} >
                        <CategoryButton
                            props={props} title={I18n.t('home.chef')}
                            path={require('../../assets/images/cooking.png')}
                            OnPress={() => props.navigation.navigate('WorkHelper')}
                        />
                        <CategoryButton
                            props={props} title={I18n.t('home.car')}
                            path={require('../../assets/images/car.png')}
                            OnPress={() => props.navigation.navigate('Cars')}
                        />
                    </View>
                    <View style={styles.CategoriesRow} >
                        <CategoryButton
                            props={props} title={I18n.t('home.localeFood')}
                            path={require('../../assets/images/meal.png')}
                            OnPress={() => props.navigation.navigate('FoodLists', { type: 'popular' })}
                        />
                        <CategoryButton
                            props={props} title={I18n.t('home.places')}
                            path={require('../../assets/images/serving-dish.png')}
                            OnPress={() => props.navigation.navigate('Places')}
                        />
                    </View>
                </View>
                {/* Categories View */}
                {/* KashtaButton */}
                <KashtaButton
                    title={I18n.t('home.kashta')}
                    OnPress={() => props.navigation.navigate('FoodLists', { type: 'kashta' })}
                />
                {/* Best Offers Ads */}
                {bottomLoading && <Spinner size='large' color='#F47421' />}
                {!bottomLoading && <PlacesAds DataSource={bottomSlider} style={{ alignSelf: 'flex-end' }} />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
