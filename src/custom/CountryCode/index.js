import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux';
import { countries } from '../../assets/consts'
import styles from './styles';

const CountryCode = ({ OnPress, setSource, setName, setCode }) => {
    const lang = useSelector(({ language }) => language.language)
    const langView = { flexDirection: lang == 'ar' ? 'row-reverse' : 'row' }
    const langBorder = lang == 'ar' ? styles.borderLeft : styles.borderRight
    const langBorderName = lang == 'ar' ? null : styles.borderRight

    const _setCountry = (country) => {
        setSource(country.image)
        setName(country.name)
        setCode(country.code)
        OnPress(false)
    }

    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.countryButton, langView]} onPress={() => _setCountry(item)}>
                <Text style={[styles.countryName, langBorderName]}>{lang == 'en' ? item.flag : item.arFlag}</Text>
                <Text style={[styles.countryCode, langBorder]}>{item.code}</Text>
                <Image source={item.image} style={styles.countryFlag} defaultSource={require('../../assets/images/logo.png')} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={styles.popView} onPress={() => OnPress(false)}>
            <View>
                <FlatList
                    key={'countriesCodesList'}
                    data={countries}
                    keyExtractor={item => item.flag}
                    renderItem={({ item }) => <RenderItem item={item} />}
                    style={styles.messageContainer}
                />
            </View>
        </TouchableOpacity>
    )
}

export default CountryCode
