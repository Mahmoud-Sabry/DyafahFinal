import React, { useState } from 'react'
import { View, Text } from 'react-native'
import ColoredButton from '../../custom/ColoredButton'
import styles from './styles';
import I18n from '../../languages/I18n';
import { useSelector } from 'react-redux';
import { Spinner } from 'native-base';

const AboutSec = () => {
    const lang = useSelector(({ language }) => language.language)
    const about = useSelector(({ appUser }) => appUser.aboutUs)
    const label = about ? lang == 'ar' ? about.ar_about : about.en_about : ''
    const [secPressed, setSecPressed] = useState(false);

    return (
        <View>
            <ColoredButton
                title={I18n.t('about.aboutDyafah.title')}
                ContStyle={styles.sectionButton}
                OnPress={() => setSecPressed(!secPressed)}
            />
            {
                secPressed &&
                <View style={styles.aboutView}>
                    {!about && <Spinner size='large' color='#F47421' />}
                    {about && <Text style={styles.aboutText}>{label}</Text>}
                    {/* <Text style={styles.aboutText}>{I18n.t('about.aboutDyafah.desc')}</Text> */}
                </View>
            }
        </View>
    )
}

export default AboutSec
