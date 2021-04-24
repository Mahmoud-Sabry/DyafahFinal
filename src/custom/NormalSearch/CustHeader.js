import React, { useState } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import I18n from '../../languages/I18n';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setLang, getLang } from '../../Redux/Slices/Main/language';
import { startSearch } from '../../Redux/Slices/User/home';

const CustHeader = ({ props }) => {
    const dispatch = useDispatch()
    const lang = useSelector(state => state.language.language)
    const appUser = useSelector(({ appUser }) => appUser.appUser)
    const [search, setSearch] = useState('')
    const langText = { textAlign: lang == 'ar' ? 'right' : 'left' }
    changeLang = () => {
        dispatch(setLang(lang == 'ar' ? 'en' : 'ar'))
    }

    const _goBack = () => {
        let canGoBack = props.navigation.canGoBack()
        if (canGoBack) {
            props.navigation.goBack()
        }
    }


    const _onSearchPressed = (keyword) => {
        const { api_token } = appUser ? appUser : [null]
        setSearch(keyword)
        dispatch(startSearch({
            api_token, keyword, type: '', order: '', price: 'asc'
        }))
    }

    return (
        <LinearGradient colors={['#F7921F', '#F47421']} style={styles.headerGradient}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Icon type='Feather' name='menu' style={styles.iconMenu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                <Icon name="cart" type="MaterialCommunityIcons" style={styles.iconMenu} />
            </TouchableOpacity>
            <SearchBar
                platform="ios"
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder={I18n.t('search')}
                placeholderTextColor='#ffffff'
                searchIcon={{ color: '#ffffff', size: 30 }}
                inputStyle={[styles.inputStyle, langText]}
                onChangeText={(keyword) => _onSearchPressed(keyword)}
                showCancel={false}
                cancelButtonProps={{ color: '#FFFFFF' }}
                value={search}
            />
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

export default CustHeader
