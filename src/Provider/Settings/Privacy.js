import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';

const Privacy = () => {
    const lang = useSelector(({ language }) => language.language)
    const privacy = useSelector(({ appUser }) => appUser.privacy)
    const label = privacy ? lang == 'ar' ? privacy.ar_privacy : privacy.en_privacy : ''
    return (
        <View style={styles.secView}>
            {!privacy && <Spinner size='large' color='#F47421' />}
            {privacy && <Text style={styles.aboutText}>{label}</Text>}
            {/* <Text style={styles.aboutText}>{I18n.t('about.aboutDyafah.desc')}</Text> */}
        </View >
    )
}

export default Privacy
