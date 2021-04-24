import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../Redux/Slices/Main/language';
import ColoredButton from '../../custom/ColoredButton'
import styles from './styles';
import { Icon } from 'native-base';
import I18n from '../../languages/I18n';

const LangSection = () => {

    const [secPressed, setSecPressed] = useState(false);
    const lang = useSelector(({ language }) => language.language)
    const dispatch = useDispatch()

    const _setLanguage = (lang) => {
        dispatch(setLang(lang))
    }

    return (
        <View>
            <ColoredButton
                title={I18n.t('about.language')}
                ContStyle={styles.sectionButton}
                OnPress={() => setSecPressed(!secPressed)}
            />
            {
                secPressed &&
                <>
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
                </>
            }
        </View>
    )
}

export default LangSection
