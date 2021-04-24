import Geolocation from '@react-native-community/geolocation';
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import styles from './styles';
import Header from '../header';
import { SearchBar } from 'react-native-elements';
import I18n from '../../languages/I18n';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../Redux/Slices/User/home';

const GoogleMaps = (props) => {
    const dispatch = useDispatch()
    Geocoder.init("AIzaSyCIBDep_TSJxP1G5PPSEeYPk7zK6TKI3gM")
    const lang = useSelector(({ language }) => language.language)
    const Location = useSelector(({ home }) => home.Location)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    const [coords, setCoords] = useState({
        latitude: 30.0,
        longitude: 31.0,
    })
    const [search, setSearch] = useState('')
    _getAddress()

    async function _getAddress() {
        if (coords.latitude == 30.0) {
            console.log('_getAddress: ')
            await Geolocation.getCurrentPosition(
                position => {
                    setCoords({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                    const initialPosition = JSON.stringify(position);
                    console.log('getCurrentPosition: ', position)
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                        .then(json => {
                            var addressComponent = json.results[0].formatted_address
                            dispatch(setLocation(addressComponent))
                            console.log('Geocoder: ', addressComponent);
                        })
                        .catch(error => console.log(error));
                },
                error => console.log('Error', JSON.stringify(error)),
                { enableHighAccuracy: false, timeout: 5000 },
            )
        }
    }

    const _setCoords = (e) => {
        console.log("Drag End: ", e)
        setCoords(e.coordinate)
        Geocoder.from(e.coordinate.latitude, e.coordinate.longitude)
            .then(json => {
                var addressComponent = json.results[0].formatted_address
                dispatch(setLocation(addressComponent))
                console.log('Geocoder: ', addressComponent);
            })
            .catch(error => console.log(error));
    }

    const _searchLocation = (search) => {
        Geocoder.from(search)
            .then(json => {
                dispatch(setLocation(search))
                console.log('Geocoder: ', json.results[0].geometry.location)
                setCoords({
                    latitude: json.results[0].geometry.location.lat,
                    longitude: json.results[0].geometry.location.lng
                })
            })
            .catch(error => console.log(error));
        setSearch(search)
    }

    const _onConfirm = () => {
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Header props={props} />
            <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                style={styles.container}
                region={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType='standard'
            >
                <Marker draggable
                    coordinate={coords}
                    onDragEnd={(e) => _setCoords(e.nativeEvent)} // console.log("Drag End: ", e.nativeEvent.coordinate)
                />
            </MapView>
            <SearchBar
                platform="ios"
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder={I18n.t('locationSearch')}
                placeholderTextColor='#ffffff'
                searchIcon={{ color: '#ffffff', size: 25 }}
                inputStyle={[styles.inputStyle, langText]}
                onChangeText={(search) => _searchLocation(search)}
                showCancel={false}
                cancelButtonProps={{ color: '#FFFFFF', fontSize: 10 }}
                value={search}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={() => _onConfirm()} >
                <Text style={styles.confirmText}>{I18n.t('userAuth.confirm')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GoogleMaps
