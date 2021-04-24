import React from 'react'
import { TouchableOpacity, Text, SafeAreaView, Image, ScrollView, ImageBackground } from 'react-native'
import styles from './styles';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';
import BackButton from '../../custom/BackButton';

const MenuButton = ({ title = 'Title', OnPress }) => {
    return (
        <TouchableOpacity style={styles.menuButton} onPress={() => OnPress ? OnPress() : null}>
            <Text style={styles.menuText}>{title}</Text>
        </TouchableOpacity>
    )
}

const ServicesMenu = (props) => {
    const { navigation } = props
    const language = useSelector(({ language }) => language.language)
    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Container}>
                <ImageBackground source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}>
                    <BackButton navigation={navigation} style={{ top: 10 }} />
                </ImageBackground>
                {/* <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logoImage}
                /> */}
                <Text style={styles.labelText}>{I18n.t('providerAuth.pickService')}</Text>
                <MenuButton OnPress={() => navigation.push('CarReg', { type: 'Provider' })} title={I18n.t('providerAuth.carPro')} />
                <MenuButton OnPress={() => navigation.push('WorkerReg', { type: 'coffee' })} title={I18n.t('providerAuth.cofee')} />
                <MenuButton OnPress={() => navigation.push('WorkerReg', { type: 'chef' })} title={I18n.t('providerAuth.chef')} />
                <MenuButton OnPress={() => navigation.push('WorkerReg', { type: 'places' })} title={I18n.t('providerAuth.places')} />
                <MenuButton OnPress={() => navigation.push('WorkerReg', { type: 'popular_eating' })} title={I18n.t('providerAuth.eating')} />
                <MenuButton OnPress={() => navigation.push('WorkerReg', { type: 'kashta' })} title={I18n.t('providerAuth.kashta')} />
                <TouchableOpacity onPress={() => navigation.push('Login')}>
                    <Text style={styles.loginText}>{I18n.t('providerAuth.loginLabel')}{I18n.t('providerAuth.login')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ServicesMenu
