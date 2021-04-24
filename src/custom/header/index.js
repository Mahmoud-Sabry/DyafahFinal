import React, { useState, Component } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Icon, Input, Item, Header as BaseHeader } from 'native-base';
import I18n from '../../languages/I18n';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setLang, getLang } from '../../Redux/Slices/Main/language';

const Header = ({ props, inSearch, search, setSearch }) => {
    // const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const lang = useSelector(state => state.language.language)
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    outSearch = () => {
        return (
            <TouchableOpacity
                style={styles.outsearchContainer}
                onPress={() => props.navigation.navigate('NormalSearch')}
            >
                <Text style={[styles.textStyle]}>{I18n.t('search')}</Text>
            </TouchableOpacity>
        )
    }
    InSearch = () => {
        if (search) {
            return (
                // <Item style={styles.searchContainer} rounded>
                //     <Icon name="ios-search" />
                //     <Input placeholder="Search" />
                //     <Icon name="ios-people" />
                // </Item>
                <SearchBar
                    platform="ios"
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder={I18n.t('search')}
                    placeholderTextColor='#ffffff'
                    searchIcon={{ color: '#ffffff', size: 30 }}
                    inputStyle={[styles.inputStyle, langText]}
                    onChangeText={(search) => { setSearch(search) }}
                    showCancel={false}
                    cancelButtonProps={{ color: '#FFFFFF' }}
                    value={search}
                />
            )
        } else return (
            <View style={styles.emptySearchContainer}></View>
        )
    }
    changeLang = () => {
        dispatch(setLang(lang == 'ar' ? 'en' : 'ar'))
    }

    const _goBack = () => {
        //canGoBack   goBack
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }

    return (
        <LinearGradient colors={['#F7921F', '#F47421']} style={styles.headerGradient}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon type='Feather' name='menu' style={styles.iconMenu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                <Icon name="cart" type="MaterialCommunityIcons" style={styles.iconMenu} />
            </TouchableOpacity>
            {
                inSearch ? InSearch() : outSearch()
            }
            <TouchableOpacity onPress={() => changeLang()}>
                <ImageBackground source={require('../../assets/images/global.png')} style={styles.langImage}  >
                    <Text style={styles.langText} >{lang == 'ar' ? 'ع' : 'E'}</Text>
                </ImageBackground>
            </TouchableOpacity>
            {props.navigation.canGoBack() && <TouchableOpacity onPress={() => _goBack()}>
                <Icon name="arrow-left" type="SimpleLineIcons" style={styles.iconMenu} />
            </TouchableOpacity>}
        </LinearGradient>
    )
}

export default Header
