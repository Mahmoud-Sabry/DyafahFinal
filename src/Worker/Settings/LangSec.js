import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../Redux/Slices/Main/language';
import styles from './styles';
import { Icon } from 'native-base';

const LangSec = () => {

    const lang = useSelector(({ language }) => language.language)
    const dispatch = useDispatch()

    const _setLanguage = (lang) => {
        dispatch(setLang(lang))
    }

    return (
        <View style={styles.secView}>
            <TouchableOpacity style={styles.langButton} onPress={() => _setLanguage('ar')}>
                {lang == 'ar' && <View style={styles.iconView}>
                    <Icon type='Entypo' name='check' style={styles.icon} />
                </View>}
                <Text style={[styles.langText, { color: lang == 'ar' ? '#F47421' : '#64615E' }]}>اللغة العربية</Text>
            </TouchableOpacity>
            <View style={styles.lineView} />
            <TouchableOpacity style={styles.langButton} onPress={() => _setLanguage('en')}>
                {lang == 'en' && <View style={styles.iconView}>
                    <Icon type='Entypo' name='check' style={styles.icon} />
                </View>}
                <Text style={[styles.langText, { color: lang == 'ar' ? '#64615E' : '#F47421' }]}>English</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LangSec
