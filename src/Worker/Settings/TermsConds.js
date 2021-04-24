import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';

const TermsConds = () => {
    const lang = useSelector(({ language }) => language.language)
    const terms = useSelector(({ appUser }) => appUser.termsCondition)
    const label = terms ? lang == 'ar' ? terms.ar_terms : terms.en_terms : ''
    return (
        <View style={styles.secView}>
            {!terms && <Spinner size='large' color='#F47421' />}
            {terms && <Text style={styles.aboutText}>{label}</Text>}
            {/* <Text style={styles.aboutText}>{I18n.t('about.aboutDyafah.desc')}</Text> */}
        </View >
    )
}

export default TermsConds
