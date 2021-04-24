import React, { useState } from 'react'
import { View, Text } from 'react-native'
import ColoredButton from '../ColoredButton'
import styles from './styles';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';

const Terms = () => {
    const lang = useSelector(({ language }) => language.language)
    const terms = useSelector(({ appUser }) => appUser.termsCondition)
    const label = terms ? lang == 'ar' ? terms.ar_terms : terms.en_terms : ''
    const [secPressed, setSecPressed] = useState(false);

    return (
        <View>
            <ColoredButton
                title={I18n.t('about.terms.title')}
                ContStyle={styles.sectionButton}
                OnPress={() => setSecPressed(!secPressed)}
            />
            {
                secPressed &&
                <View style={styles.aboutView}>
                    {!terms && <Spinner size='large' color='#F47421' />}
                    {terms && <Text style={styles.aboutText}>{label}</Text>}
                    {/* <Text style={styles.aboutText}>{I18n.t('about.terms.desc')}</Text> */}
                </View>
            }
        </View>
    )
}

export default Terms
